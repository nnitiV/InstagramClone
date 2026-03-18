import {
  getLoggedUserInfo,
  getLoggedUserToken,
} from "@/feature/auth/services/auth-service";
import { LastMessageDto, MessageType, SendMessage } from "@/types/messages";
import * as SignalR from "@microsoft/signalr";
import { create } from "zustand";
import { useNotificationStore } from "./useNotificationStore";
import { NotificationType } from "@/types/notification";
import { BASE_URL } from "@/constants";

interface ChatState {
  connection: SignalR.HubConnection | null;
  realTimeMessages: MessageType[];
  sideBarChats: LastMessageDto[];
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (msg: SendMessage) => Promise<void>;
  setSideBarChats: (chats: LastMessageDto[]) => void;
  clearRealTimeMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  connection: null,
  realTimeMessages: [],
  sideBarChats: [],

  connect: async () => {
    if (get().connection) return;

    const token = await getLoggedUserToken();
    if (!token) return;
    const idUserLogado = (await getLoggedUserInfo()).id;

    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}hubs/chat`, {
        accessTokenFactory: () => token || "",
      })
      .withAutomaticReconnect()
      .build();
      
    newConnection.on("ReceiveNotification",(notification: NotificationType) => {
        useNotificationStore.getState().addRealTimeNotification(notification);
      },
    );
    newConnection.on("RemoveNotification", (triggerById: number, type: string) => {
      useNotificationStore.getState().removeNotification(triggerById, type);
  });

    newConnection.on("ReceiveMessage", async (message: MessageType) => {
      set((state: ChatState) => {
        const updatedMessages = [...state.realTimeMessages, message];

        const chats = [...state.sideBarChats];
        const chatIndex = chats.findIndex((c) => {
          const msgSender = Number(message.senderId);
          const msgReceiver = Number(message.receiverId);

          // A conversa é a mesma se os envolvidos forem os mesmos
          return (
            (c.senderId === msgSender && c.receiverId === msgReceiver) ||
            (c.senderId === msgReceiver && c.receiverId === msgSender)
          );
        });

        if (chatIndex !== -1) {
          const updatedChat = { ...chats[chatIndex] };
          chats.splice(chatIndex, 1);

          updatedChat.lastMessage = message.content;
          updatedChat.lastMessageAt =
            message.timestamp || new Date().toISOString();
          updatedChat.senderId = Number(message.senderId);
          updatedChat.receiverId = Number(message.receiverId);

          updatedChat.unreadCount += 1;

          chats.unshift(updatedChat);
        } else {
          const souORemetente = Number(message.senderId) === idUserLogado;
          const newChat: LastMessageDto = {
            id: message.id,
            name: souORemetente ? message.receiverName : message.senderName,
            pictureUrl: souORemetente
              ? message.receiverPhoto
              : message.senderPhoto,
            lastMessage: message.content,
            lastMessageAt: message.timestamp || new Date().toISOString(),
            senderId: Number(message.senderId),
            receiverId: Number(message.receiverId),
            isGroup: false,
            unreadCount: 1,
          };

          chats.unshift(newChat);
        }

        return { sideBarChats: chats, realTimeMessages: updatedMessages };
      });
    });

    try {
      await newConnection.start();
      set({ connection: newConnection });
    } catch (error) {
      console.error("Erro no SignalR:", error);
    }
  },
  disconnect: () => {
    const { connection } = get();
    if (connection) {
      connection.stop();
      set({ connection: null, realTimeMessages: [], sideBarChats: [] });
    }
  },
  sendMessage: async (messageToSend: SendMessage) => {
    const { connection } = get();
    if (
      connection &&
      connection.state === SignalR.HubConnectionState.Connected
    ) {
      try {
        await connection.invoke("SendMessage", messageToSend);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  },
  setSideBarChats: (chats: any[]) => set({ sideBarChats: chats }),
  clearRealTimeMessages: () => set({ realTimeMessages: [] }),
}));
