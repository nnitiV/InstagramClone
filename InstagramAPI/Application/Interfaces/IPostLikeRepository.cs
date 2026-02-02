using Domain.Entities;

namespace Application.Interfaces
{
    public interface IPostLikeRepository
    {
        Task<int> GetAmountOfLikesAsync(int postId);
        Task LikePostAsync(PostLike postLike);
        Task<bool> UnlikePostAsync(int postId, int userId);
        Task<bool> HasUserLikedItAsync(int postId, int userId);
    }
}
