using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PostlikeRepository: IPostLikeRepository
    {
        private readonly AppDbContext _context;
        public PostlikeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetAmountOfLikesAsync(int postId)
        {
            return await _context.PostLikes.CountAsync(pl => pl.PostId == postId);
        }

        public async Task<bool> HasUserLikedItAsync(int postId, int userId)
        {
            return await _context.PostLikes.AnyAsync(pl => pl.UserId == userId && pl.PostId == postId);
        }

        public async Task LikePostAsync(PostLike postLike)
        {
            await _context.PostLikes.AddAsync(postLike);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UnlikePostAsync(int postId, int userId)
        {
            return await _context.PostLikes.Where(pl => pl.UserId == userId && pl.PostId == postId).ExecuteDeleteAsync() > 0;
        }
    }
}
