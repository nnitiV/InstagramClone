using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICommentLikeRepository
    {
        Task<int> GetAmountOfLikesAsync(int commentId);
        Task LikeCommentAsync(CommentLike commentLike);
        Task<bool> UnlikeCommentAsync(int commentId, int userId);
        Task<bool> HasUserLikedItAsync(int commentId, int userId);
    }
}
