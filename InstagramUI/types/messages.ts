export type MessageType = {
    id: number;
    senderName: string;
    senderPhoto: string;
    receiverName: string;
    receiverPhoto: string;
    lastMessage: string;
    timestamp: string;
    isUnread: boolean;
    isOnline: boolean;
    senderId: number | string;
    receiverId: number | string;
    content: string;
}

export type SendMessage = {
    receiverId: number;
    content: string;
    groupId?: number;
}


export interface LastMessageDto {
    id: number;
    name: string;
    pictureUrl: string;
    lastMessage: string;
    lastMessageAt: string; 
    senderId: number;
    receiverId: number;
    isGroup: boolean;
    unreadCount: number;
}