"use client";
import ChatHeader from "@/feature/message/components/ChatHeader";
import ChatMessages from "@/feature/message/components/ChatMessages";
import { getChatHistory } from "@/services/message.service";
import { getLoggedUserInfo, getUserById } from "@/services/user.service";
import { useChatStore } from "@/stores/useChatStore";
import { MessageType, SendMessage } from "@/types/messages";
import { UserProfile } from "@/types/user";
import { use, useEffect, useState } from "react";

type ChatPageProps = {
  params: Promise<{ id: number }>;
};
export default function MessageContentPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const messages = useChatStore((state) => state.realTimeMessages);
  const sendMessage = useChatStore(state => state.sendMessage);
  const [user, setUser] = useState<UserProfile>();
  const [loggedUserId, setLoggedUserId] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<MessageType[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      const loggedUserId = (await getLoggedUserInfo()).id;
      setLoggedUserId(loggedUserId);
      const user = await getUserById(id);
      setUser(user);
      const chatHistory = await getChatHistory(id);
      setChat(chatHistory.messages);
    };
    getInfo();
  }, []);

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement> | null,
  ) => {
    if (e == null || (e && e.key == "Enter")) {
      if (message.length > 0) {
        const messageToSend: SendMessage = {
          receiverId: Number(id),
          content: message,
        };
        console.log(loggedUserId, messageToSend);
        await sendMessage(messageToSend);
        setMessage("");
      }
    }
  };

  const fullChat = [...chat, ...messages];
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <ChatHeader user={user} />
      <ChatMessages chat={fullChat} loggedUserId={loggedUserId} />
      <div className="p-3 border-top d-flex">
        <input
          type="text"
          className="form-control rounded-pill col-9"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
}
