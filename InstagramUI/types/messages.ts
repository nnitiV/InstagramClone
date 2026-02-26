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
