using Application.Dtos;

namespace Application.Services
{
    public interface IStoryService
    {
        Task<StoryDto> CreateStoryAsync(int userId, CreateStoryDto dto);
        Task<List<StoryDto>> GetActiveStoriesAsync(int currentUserId);
    }
}
