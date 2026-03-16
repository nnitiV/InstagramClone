using Domain.Entities;

namespace Application.Interfaces
{
    public interface IStoryLikeRepository
    {
        Task LikeStoryAsync(StoryLike storyLike);
        Task<bool> UnlikeStoryAsync(int storyId, int userId);
        Task<bool> HasUserLikedItAsync(int storyId, int userId);
    }
}
