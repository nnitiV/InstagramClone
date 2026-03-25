using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services
{
    public class PostLikeService : IPostLikeService
    {
        private readonly IPostLikeRepository _postLikeRepository;
        private readonly INotificationService _notificationService;
        private readonly IPostService _postService;
        private readonly IUserService _userService;

        public PostLikeService(IPostLikeRepository postLikeRepository, INotificationService notificationService, IPostService postService,
            IUserService userService)
        {
            _postLikeRepository = postLikeRepository;
            _notificationService = notificationService;
            _postService = postService;
            _userService = userService;
        }

        public async Task<int> GetAmountOfLikesAsync(int postId)
        {
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            return await _postLikeRepository.GetAmountOfLikesAsync(postId);
        }

        public async Task<bool> HasUserLikedItAsync(int postId, int userId)
        {
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            return await _postLikeRepository.HasUserLikedItAsync(postId, userId);
        }

        public async Task LikePostAsync(int postId, int userId)
        {
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            if (await HasUserLikedItAsync(postId, userId))
                throw new ConflictException("You already liked this!");

            ResponsePostDto responsePost = await _postService.GetPostByIdAsync(userId, postId);
            if (responsePost == null)
                throw new NotFoundException($"Couldn't find post by id {postId}");

            ResponseUserDto responseUser = await _userService.GetById(userId);
            if (responseUser == null)
                throw new NotFoundException($"Couldn't find user by id {userId}");

            PostLike postToLikeToAdd = new PostLike
            {
                PostId = postId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };

            await _postLikeRepository.LikePostAsync(postToLikeToAdd);

            // Prevent notifying the user if they like their own post
            if (responsePost.UserId != userId)
            {
                await _notificationService.AddNotificationAsync(new NotificationDto
                {
                    TriggerById = userId,
                    TriggerByUsername = responseUser.Username,
                    TriggerByPhoto = responseUser.ProfilePictureUrl,
                    Type = "PostLike",
                    Message = "curtiu seu post.",
                    PostId = postId,
                    StoryId = null
                }, responsePost.UserId);
            }
        }

        public async Task UnlikePostAsync(int postId, int userId)
        {
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            var wasUnliked = await _postLikeRepository.UnlikePostAsync(postId, userId);
            if (!wasUnliked) return;

            ResponsePostDto responsePost = await _postService.GetPostByIdAsync(userId, postId);
            if (responsePost == null) return;

            await _notificationService.DeleteNotificationAsync(responsePost.UserId, userId, "PostLike");
        }
    }
}