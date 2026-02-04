using Domain.Entities;

namespace Application.Interfaces
{
    public interface IStoryRepository
    {
        Task CreateStoryAsync(Story story);
        Task<IEnumerable<Story>> GetActiveStoriesAsync(int currentUserId);
    }
}
