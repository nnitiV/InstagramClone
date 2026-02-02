
using Application.Interfaces;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Service
{
    internal class PostLikeService : IPostLikeService
    {
        private readonly IPostLikeRepository _postLikeRepository;
        public PostLikeService(IPostLikeRepository postLikeRepository)
        {
            _postLikeRepository = postLikeRepository;
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
            PostLike postToLikeToAdd = new PostLike
            {
                PostId = postId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _postLikeRepository.LikePostAsync(postToLikeToAdd);
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
            return await _postLikeRepository.UnlikePostAsync(postId, userId);
        }
    }
}
