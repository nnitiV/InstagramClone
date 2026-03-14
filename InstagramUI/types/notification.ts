export interface NotificationType {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string; 

  triggerById: number;
  triggerByUsername: string;
  triggerByPhoto: string;

  postId?: number; 
  storyId?: number;
}