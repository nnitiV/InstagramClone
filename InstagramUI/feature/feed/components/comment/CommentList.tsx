"use client";
import { PostComment, PostCommentTree } from "@/types/feed";
import CommentItem from "./CommentItem";

interface CommentsListProps {
    comments: PostCommentTree[];
    replyTarget?: number | null;
    replyText?: string;
    onReplyClick: (commentId: number) => void;
    onReplyChange?: (text: string) => void;
    onPostReply?: () => void;
    onCancelReply?: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
    comments,
    replyTarget,
    replyText,
    onReplyClick,
    onReplyChange,
    onPostReply,
    onCancelReply
}) => (
    <>
        {comments.map((commentTree) => (
            <div key={commentTree.comment.id} className="mb-3">
                <CommentItem
                    commentTree={commentTree}
                    onReplyClick={onReplyClick}
                    isReplying={replyTarget === commentTree.comment.id}
                    replyText={replyText || ''}
                    onReplyChange={onReplyChange}
                    onPostReply={onPostReply}
                    onCancelReply={onCancelReply}
                />
                {commentTree.replies.length > 0 && (
                    <div className="border-start border-2 ms-3 ps-3 bg-light rounded">
                        <CommentsList
                            comments={commentTree.replies}
                            replyTarget={replyTarget}
                            replyText={replyText}
                            onReplyClick={onReplyClick}
                            onReplyChange={onReplyChange}
                            onPostReply={onPostReply}
                            onCancelReply={onCancelReply}
                        />
                    </div>
                )}
            </div>
        ))}
    </>
);

export default CommentsList;
