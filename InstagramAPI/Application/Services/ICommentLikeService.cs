namespace Application.Services
{
    public interface ICommentLikeService
    {
        Task<int> GetAmountOfLikesAsync(int commentId);
        Task LikeCommentAsync(int commentId, int userId);
        Task<bool> UnlikeCommentAsync(int commentId, int userId);
        Task<bool> HasUserLikedItAsync(int commentId, int userId);
    }
}
