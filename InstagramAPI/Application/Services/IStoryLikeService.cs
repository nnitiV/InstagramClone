using Application.Dtos;

namespace Application.Services
{
    public interface IStoryLikeService
    {
        Task LikeStoryAsync(int storyId, int userId);
        Task<bool> UnlikeStoryAsync(int storyId, int userId);
        Task<bool> HasUserLikedItAsync(int storyId, int userId);
    }
}
