using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentLikeRepository: ICommentLikeRepository
    {
        private readonly AppDbContext _context;
        public CommentLikeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetAmountOfLikesAsync(int commentId)
        {
            return await _context.CommentLikes.CountAsync(cl => cl.CommentId == commentId);
        }

        public async Task<bool> HasUserLikedItAsync(int commentId, int userId)
        {
            return await _context.CommentLikes.AnyAsync(cl => cl.UserId == userId && cl.CommentId == commentId);
        }

        public async Task LikeCommentAsync(CommentLike commentLike)
        {
            await _context.CommentLikes.AddAsync(commentLike);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UnlikeCommentAsync(int commentId, int userId)
        {
            return await _context.CommentLikes.Where(cl => cl.UserId == userId && cl.CommentId == commentId).ExecuteDeleteAsync() > 0;
        }
    }
}
