using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;
        public PostRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddPostAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }
        public async Task<Post?> GetPostByIdAsync(int postId)
        {
            return await _context.Posts.Where(p => p.Id == postId)
                .Include(p => p.Contents)
                .Include(p => p.User)
                .Include(p => p.PostLikes)
                .Include(p => p.Comments)
                .FirstOrDefaultAsync();
        }
        public async Task<List<Post>> GetAllUserPostsAsync(int userId, int page, int pageSize)
        {
            return await _context.Posts.Where(p => p.UserId == userId)
                .Include(p => p.Comments)
                .Include(p => p.User)
                .Include(p => p.PostLikes)
                .Include(p => p.Contents)
                .Include(p => p.Comments)
                .OrderByDescending(p => p.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).AsSplitQuery().ToListAsync();
        }
        public async Task<List<Post>> GetUserFeedAsync(int userId, DateTime? cursor, int pageSize)
        {
            DateTime cutoffDate = cursor ?? DateTime.UtcNow;

            return await _context.Posts
                .Where(p => _context.Followers.Any(f => f.UserIdFollowing == userId && f.UserIdFollowed == p.UserId))
                .Where(p => p.CreatedAt < cutoffDate)
                .Include(p => p.Comments)
                .Include(p => p.User)
                .Include(p => p.PostLikes)
                .Include(p => p.Contents)
                .OrderByDescending(p => p.CreatedAt)
                .Take(pageSize) 
                .AsSplitQuery()
                .ToListAsync();
        }
        public async Task<int> GetUserPostCountAsync(int userId)
        {
            return await _context.Posts.CountAsync(p => p.UserId == userId);
        }
        public async Task<bool> UpdatePostAsync(Post updatePost)
        {
            var rowsChanged = await _context.SaveChangesAsync();
            return rowsChanged > 0;
        }
        public async Task<bool> DeletePostByIdAsync(int postId, int userId)
        {
            var rowsChanged = await _context.Posts.Where(p => p.Id == postId && p.UserId == userId).ExecuteDeleteAsync();
            return rowsChanged > 0;
        }
    }
}
