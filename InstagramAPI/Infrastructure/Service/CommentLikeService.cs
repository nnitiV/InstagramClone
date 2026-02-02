using Application.Interfaces;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Service
{
    public class CommentLikeService: ICommentLikeService
    {
        private readonly ICommentLikeRepository _commentLikeRepository;
        public CommentLikeService(ICommentLikeRepository commentLikeRepository)
        {
            _commentLikeRepository = commentLikeRepository;
        }

        public async Task<int> GetAmountOfLikesAsync(int commentId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentException("Please, provide a valid comment like id.");
            }
            return await _commentLikeRepository.GetAmountOfLikesAsync(commentId);
        }

        public async Task<bool> HasUserLikedItAsync(int commentId, int userId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentException("Please, provide a valid comment like id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _commentLikeRepository.HasUserLikedItAsync(commentId, userId);
        }

        public async Task LikeCommentAsync(int commentId, int userId)
        {
            if(commentId <= 0)
            {
                throw new ArgumentException("Please, provide a valid comment like id.");
            }
            if(await HasUserLikedItAsync(commentId, userId))
            {
                throw new ArgumentException("You already liked this!");
            }
            CommentLike commentLikeToAdd = new CommentLike
            {
                CommentId = commentId,
                UserId = userId,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _commentLikeRepository.LikeCommentAsync(commentLikeToAdd);
        }

        public async Task<bool> UnlikeCommentAsync(int commentId, int userId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentException("Please, provide a valid comment like id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _commentLikeRepository.UnlikeCommentAsync(commentId, userId);
        }
    }
}
