namespace Application.Services
{
    public interface IStoryLikeService
    {
        Task LikeStoryAsync(int storyId, int userId);
        Task UnlikeStoryAsync(int storyId, int userId);
        Task<bool> HasUserLikedItAsync(int storyId, int userId);
    }
}
