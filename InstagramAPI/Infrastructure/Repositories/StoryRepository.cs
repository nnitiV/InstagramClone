using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class StoryRepository: IStoryRepository
    {
        private readonly AppDbContext _context;
        public StoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Story?> GetStoryByIdAsync(int storyId)
        {
            return await _context.Stories.Where(p => p.Id == storyId)
                .Include(p => p.User)
                .FirstOrDefaultAsync();
        }

        public async Task<Story?> GetStoryByUsernameAsync(string username)
        {
            DateTime yesterday = DateTime.UtcNow.AddHours(-24);

            return await _context.Stories
                .Include(s => s.User)
                .Where(s => s.User.Username == username)
                .Where(s => s.CreatedAt >= yesterday)
                .OrderBy(s => s.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> CheckIfStoryByIdExists(int storyId)
        {
            return await _context.Stories.AnyAsync(s => s.Id == storyId);
        }

        public async Task CreateStoryAsync(Story story)
        {
            _context.Stories.Add(story);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Story>> GetActiveStoriesAsync(int currentUserId)
        {
            var followingIds = await _context.Followers
                .Where(f => f.UserIdFollowing == currentUserId)
                .Select(f => f.UserIdFollowed)
                .ToListAsync();

            followingIds.Add(currentUserId);

            return await _context.Stories
                .Where(s => s.ExpiresAt > DateTimeOffset.UtcNow) 
                .Where(s => followingIds.Contains(s.UserId))     
                .Include(s => s.User)                           
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<Boolean> CheckIfStoryStillActive(int storyId)
        {
            return await _context.Stories.AnyAsync(s => s.Id == storyId && s.ExpiresAt > DateTimeOffset.UtcNow);
        }
    }
}
