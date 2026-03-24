namespace Application.Services
{
    public interface IPostLikeService
    {
        Task<int> GetAmountOfLikesAsync(int postId);
        Task LikePostAsync(int postId, int userId);
        Task UnlikePostAsync(int postId, int userId);
        Task<bool> HasUserLikedItAsync(int postId, int userId);
    }
}
