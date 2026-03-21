using Application.Dtos;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IStoryRepository
    {
        Task<Story?> GetStoryByIdAsync(int postId);
        Task<Story?> GetStoryByUsernameAsync(string username);
        Task CreateStoryAsync(Story story);
        Task<IEnumerable<Story>> GetActiveStoriesAsync(int currentUserId);
        Task<Boolean> CheckIfStoryStillActive(int storyId);
    }
}
