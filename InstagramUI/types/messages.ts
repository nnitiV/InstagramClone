export type MessageType = {
    id: number;
    username: string;
    profilePicture: string;
    lastMessage: string;
    timestamp: string;
    isUnread: boolean;
    isOnline: boolean;
    senderId: number | string;
    text: string;
}


export interface LastMessageDto {
    id: number;
    name: string;
    pictureUrl: string;
    lastMessage: string;
    /** Formato ISO 8601 (ex: "2026-03-03T20:18:07Z") */
    lastMessageAt: string; 
    isGroup: boolean;
    unreadCount: number;
}