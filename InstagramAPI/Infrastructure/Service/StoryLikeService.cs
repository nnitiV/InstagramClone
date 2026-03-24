
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Infrastructure.Service
{
    public class StoryLikeService : IStoryLikeService
    {
        private readonly IStoryLikeRepository _storyLikeRepository;
        private readonly INotificationService _notificationService;
        private readonly IStoryService _storyService;
        private readonly IUserService _userService;

        public StoryLikeService(IStoryLikeRepository storyLikeRepository, 
            INotificationService notificationService, IStoryService storyService,
            IUserService userService)
        {
            _storyLikeRepository = storyLikeRepository;
            _notificationService = notificationService;
            _storyService = storyService;
            _userService = userService;
        }

        public async Task<bool> HasUserLikedItAsync(int storyId, int userId)
        {
            if (storyId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _storyLikeRepository.HasUserLikedItAsync(storyId, userId);
        }

        public async Task LikeStoryAsync(int storyId, int userId)
        {
            if (storyId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (await HasUserLikedItAsync(storyId, userId))
            {
                throw new ArgumentException("You already liked this!");
            }
            StoryDto storyDto = await _storyService.GetStoryById(storyId);
            if(storyDto == null)
            {
                throw new ArgumentException("Couldn't find post by id " + storyId);
            }
            ResponseUserDto responseUser = await _userService.GetById(userId);
            if (responseUser == null)
            {
                throw new ArgumentException("Couldn't find user by id " + userId);
            }
            StoryLike postToLikeToAdd = new StoryLike
            {
                StoryId = storyId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _storyLikeRepository.LikeStoryAsync(postToLikeToAdd);
            await _notificationService.AddNotificationAsync(new NotificationDto
            {
                TriggerById = userId,
                TriggerByUsername = responseUser.Username,
                TriggerByPhoto = responseUser.ProfilePictureUrl,
                Type = "StoryLike",
                Message = "Curtiu seu story.",
                PostId = storyId,
                StoryId = null
            }, storyDto.UserId.Value);
        }

        public async Task UnlikeStoryAsync(int storyId, int userId)
        {
            if (storyId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }

            var wasUnliked = await _storyLikeRepository.UnlikeStoryAsync(storyId, userId);
            if (!wasUnliked) return;

            StoryDto storyDto = await _storyService.GetStoryById(storyId);
            if (storyDto == null)
            {
                throw new ArgumentException("Couldn't find post by id " + storyId);
            }

            await _notificationService.DeleteNotificationAsync(storyDto.UserId.Value, userId, "StoryLike");
        }
    }
}
