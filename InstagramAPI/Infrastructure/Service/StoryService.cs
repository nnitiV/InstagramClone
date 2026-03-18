using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Infrastructure.Service
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
            if (storyId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            Story? story = await _storyRepository.GetStoryByIdAsync(storyId);
            if (story == null)
            {
                return null;
            }
            StoryDto storyToReturn = new StoryDto
            {
                Id = story.Id,
                Username = story.User?.Username ?? "",
                UserId = story.User?.Id,
                ExpiresAt = story.ExpiresAt,
                MediaUrl = story.MediaUrl,
                ProfilePictureUrl = story.User?.ProfilePictureUrl ?? "",
                CreatedAt = story.CreatedAt
            };
            return storyToReturn;
        }

        public async Task<StoryDto> CreateStoryAsync(int userId, CreateStoryDto dto)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("User id can't be null.");
            }
            ResponseUserDto user = await _userService.GetById(userId);
            if(user == null)
            {
                throw new NotFoundException("Couldn't find user with id" + userId);
            }
            if (dto.File == null)
            {
                throw new ArgumentException("Please, provide a file for story creation.");
            }
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
                ProfilePictureUrl = user.ProfilePictureUrl,
                CreatedAt = story.CreatedAt,
                ExpiresAt = story.ExpiresAt,
            };
        }

        public async Task<List<StoryDto>> GetActiveStoriesAsync(int currentUserId)
        {
            var stories = await _storyRepository.GetActiveStoriesAsync(currentUserId);

            var storyDtos = stories.Select(story => new StoryDto
            {
                Id = story.Id,
                MediaUrl = story.MediaUrl,
                CreatedAt = story.CreatedAt,
                ExpiresAt = story.ExpiresAt,
                Username = story.User?.Username ?? "Unknown",
                ProfilePictureUrl = story.User?.ProfilePictureUrl
            }).ToList();

            return storyDtos;
        }

        public async Task<Boolean> CheckIfStoryStillActive(int storyId)
        {
            return await _storyRepository.CheckIfStoryStillActive(storyId);
        }
    }
}
