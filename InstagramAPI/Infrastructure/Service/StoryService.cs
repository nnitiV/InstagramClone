using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IFileService _fileService;
        private readonly IUserService _userService;

        public StoryService(IStoryRepository storyRepository, IFileService fileService, IUserService userService)
        {
            _storyRepository = storyRepository;
            _fileService = fileService;
            _userService = userService;
        }

        public async Task<StoryDto?> GetStoryById(int storyId)
        {
            if (storyId <= 0) throw new BadRequestException("Please, provide a valid story id.");

            Story? story = await _storyRepository.GetStoryByIdAsync(storyId);
            if (story == null) return null;

            return new StoryDto
            {
                Id = story.Id,
                Username = story.User?.Username ?? "",
                UserId = story.User?.Id,
                ExpiresAt = story.ExpiresAt,
                MediaUrl = story.MediaUrl,
                ProfilePictureUrl = story.User?.ProfilePictureUrl ?? "",
                CreatedAt = story.CreatedAt
            };
        }

        public async Task<StoryDto?> GetStoryByUsernameAsync(int currentUserId, string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new BadRequestException("Please, provide a valid username.");

            Story? story = await _storyRepository.GetStoryByUsernameAsync(username);
            if (story == null) return null;

            return new StoryDto
            {
                Id = story.Id,
                Username = story.User?.Username ?? "",
                UserId = story.User?.Id,
                ExpiresAt = story.ExpiresAt,
                MediaUrl = story.MediaUrl,
                ProfilePictureUrl = story.User?.ProfilePictureUrl ?? "",
                CreatedAt = story.CreatedAt
            };
        }

        public async Task<StoryDto> CreateStoryAsync(int userId, CreateStoryDto dto)
        {
            if (dto.File == null) throw new BadRequestException("Please, provide a file for story creation.");

            ResponseUserDto user = await _userService.GetByIdAsync(userId);
            if (user == null) throw new NotFoundException($"Couldn't find user with id {userId}");

            string fileUrl = await _fileService.SaveFileAsync(dto.File);

            Story story = new Story
            {
                UserId = userId,
                MediaUrl = fileUrl,
                CreatedAt = DateTimeOffset.UtcNow,
                ExpiresAt = DateTimeOffset.UtcNow.AddHours(24)
            };

            await _storyRepository.CreateStoryAsync(story);

            return new StoryDto
            {
                Id = story.Id,
                Username = user.Username,
                MediaUrl = fileUrl,
                UserId = user.Id,
                ProfilePictureUrl = user.ProfilePictureUrl,
                CreatedAt = story.CreatedAt,
                ExpiresAt = story.ExpiresAt,
            };
        }

        public async Task<List<StoryDto>> GetActiveStoriesAsync(int currentUserId)
        {
            var stories = await _storyRepository.GetActiveStoriesAsync(currentUserId);

            return stories.Select(story => new StoryDto
            {
                Id = story.Id,
                MediaUrl = story.MediaUrl,
                CreatedAt = story.CreatedAt,
                UserId = story.User?.Id,
                ExpiresAt = story.ExpiresAt,
                Username = story.User?.Username ?? "Unknown",
                ProfilePictureUrl = story.User?.ProfilePictureUrl
            }).ToList();
        }

        public async Task<bool> CheckIfStoryStillActive(int storyId)
        {
            if (storyId <= 0) throw new BadRequestException("Please, provide a valid story id.");
            return await _storyRepository.CheckIfStoryStillActive(storyId);
        }
    }
}