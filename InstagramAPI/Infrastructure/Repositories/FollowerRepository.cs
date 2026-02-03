using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class FollowerRepository : IFollowerRepository
    {
        private readonly AppDbContext _context;
        public FollowerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task FollowUserAsync(Follower follower)
        {
            await _context.Followers.AddAsync(follower);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Follower>> GetListOfFollowersAsync(int userId)
        {
            return await _context.Followers.Where(f => f.UserIdFollowed == userId).Include(f => f.UserFollowing).ToListAsync();
        }

        public async Task<List<Follower>> GetListOfFollowingAsync(int userId)
        {
            return await _context.Followers.Where(f => f.UserIdFollowing == userId).Include(f => f.UserFollowed).ToListAsync();
        }

        public async Task<int> GetTotalFollowersAsync(int userId)
        {
            return await _context.Followers.CountAsync(f => f.UserIdFollowed == userId);
        }
            
        public async Task<int> GetTotalFollowingAsync(int userId)
        {
            return await _context.Followers.CountAsync(f => f.UserIdFollowing == userId);
        }

        public async Task<bool> IsFollowingAsync(int observerId, int targetId)
        {
            return await _context.Followers.AnyAsync(f => f.UserIdFollowing == observerId && f.UserIdFollowed == targetId);
        }

        public async Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId)
        {
            return await _context.Followers.Where(f => f.UserIdFollowing == followingUserId && f.UserIdFollowed == followedUserId).ExecuteDeleteAsync() > 0;
        }
    }
}
