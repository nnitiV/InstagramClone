using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StoryLikeRepository : IStoryLikeRepository
    {
        private readonly AppDbContext _context;
        public StoryLikeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> HasUserLikedItAsync(int storyId, int userId)
        {
            return await _context.StoryLikes.AnyAsync(sl => sl.UserId == userId && sl.StoryId == storyId);
        }

        public async Task LikeStoryAsync(StoryLike storyLike)
        {
            await _context.StoryLikes.AddAsync(storyLike);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UnlikeStoryAsync(int storyId, int userId)
        {
            return await _context.StoryLikes.Where(pl => pl.UserId == userId && pl.StoryId == storyId).ExecuteDeleteAsync() > 0;
        }
    }
}
