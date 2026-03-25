using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services
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
            if (storyId <= 0) throw new BadRequestException("Please, provide a valid story id.");

            return await _storyLikeRepository.HasUserLikedItAsync(storyId, userId);
        }

        public async Task LikeStoryAsync(int storyId, int userId)
        {
            if (storyId <= 0) throw new BadRequestException("Please, provide a valid story id.");

            if (await HasUserLikedItAsync(storyId, userId))
                throw new ConflictException("You already liked this!");

            StoryDto storyDto = await _storyService.GetStoryById(storyId);
            if (storyDto == null)
                throw new NotFoundException($"Couldn't find story by id {storyId}");

            ResponseUserDto responseUser = await _userService.GetById(userId);
            if (responseUser == null)
                throw new NotFoundException($"Couldn't find user by id {userId}");

            StoryLike storyLikeToAdd = new StoryLike
            {
                StoryId = storyId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };

            await _storyLikeRepository.LikeStoryAsync(storyLikeToAdd);

            // Prevent notifying the user if they like their own story
            if (storyDto.UserId.Value != userId)
            {
                await _notificationService.AddNotificationAsync(new NotificationDto
                {
                    TriggerById = userId,
                    TriggerByUsername = responseUser.Username,
                    TriggerByPhoto = responseUser.ProfilePictureUrl,
                    Type = "StoryLike",
                    Message = "curtiu seu story.",
                    PostId = null, // Fixed to null
                    StoryId = storyId // Fixed to map the storyId
                }, storyDto.UserId.Value);
            }
        }

        public async Task UnlikeStoryAsync(int storyId, int userId)
        {
            if (storyId <= 0) throw new BadRequestException("Please, provide a valid story id.");

            var wasUnliked = await _storyLikeRepository.UnlikeStoryAsync(storyId, userId);
            if (!wasUnliked) return;

            StoryDto storyDto = await _storyService.GetStoryById(storyId);
            if (storyDto == null) return;

            await _notificationService.DeleteNotificationAsync(storyDto.UserId.Value, userId, "StoryLike");
        }
    }
}