
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Infrastructure.Service
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
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            return await _postLikeRepository.GetAmountOfLikesAsync(postId);
        }

        public async Task<bool> HasUserLikedItAsync(int postId, int userId)
        {
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _postLikeRepository.HasUserLikedItAsync(postId, userId);
        }

        public async Task LikePostAsync(int postId, int userId)
        {
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (await HasUserLikedItAsync(postId, userId))
            {
                throw new ArgumentException("You already liked this!");
            }
            ResponsePostDto responsePost = await _postService.GetPostByIdAsync(userId, postId);
            if(responsePost == null)
            {
                throw new ArgumentException("Couldn't find post by id " + postId);
            }
            ResponseUserDto responseUser = await _userService.GetById(userId);
            if (responseUser == null)
            {
                throw new ArgumentException("Couldn't find user by id " + userId);
            }
            PostLike postToLikeToAdd = new PostLike
            {
                PostId = postId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _postLikeRepository.LikePostAsync(postToLikeToAdd);

            await _notificationService.AddNotificationAsync(new NotificationDto
            {
                TriggerById = userId,
                TriggerByUsername = responseUser.Username,
                TriggerByPhoto = responseUser.ProfilePictureUrl,
                Type = "PostLike",
                Message = "Curtiu seu post.",
                PostId = postId,
                StoryId = null
            }, responsePost.UserId);
        }

        public async Task<bool> UnlikePostAsync(int postId, int userId)
        {
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }

            var wasUnliked = await _postLikeRepository.UnlikePostAsync(postId, userId);
            if (!wasUnliked) return false;

            ResponsePostDto responsePost = await _postService.GetPostByIdAsync(userId, postId);
            if (responsePost == null)
            {
                throw new ArgumentException("Couldn't find post by id " + postId);
            }

            await _notificationService.DeleteNotification(responsePost.UserId, userId, "PostLike");

            return true;
        }
    }
}
