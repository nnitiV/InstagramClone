export type Story = {
    id: number;
    username: string;
    mediaurl: string;
    profilePictureUrl: string;
}

export type Post = {
    id: number;
    authorName: string;
    profilePictureUrl: string;
    caption: string;
    title: string;
    userId: number;
    contentUrls: string[];
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    createdAt: string;
}
