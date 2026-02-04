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
        public async Task CreateStoryAsync(Story story)
        {
            _context.Stories.Add(story);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Story>> GetActiveStoriesAsync()
        {
            return await _context.Stories
                .Where(s => s.ExpiresAt > DateTimeOffset.UtcNow)
                .Include(s => s.User) 
                .OrderByDescending(s => s.CreatedAt) 
                .ToListAsync();
        }
    }
}
