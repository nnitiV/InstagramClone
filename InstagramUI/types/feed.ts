export type Story = {
    id: number;
    username: string;
    mediaUrl: string;
    createdAt: Date;
    userId: number;
    profilePictureUrl: string;
}

export type Post = {
    id: number;
    authorName: string;
    authorProfilePicture: string;
    caption: string;
    title: string;
    userId: number;
    contentUrls: string[];
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    createdAt: string;
}

export type PostComment = {
    id: number;
    text: string;
    postId: number;
    userId: number;
    username: string;
    profilePictureUrl: string | null;
    parentCommentId: number | null;
    createdAt: string;
}

export interface PostCommentTree {
    comment: PostComment;
    replies: PostCommentTree[];
}
