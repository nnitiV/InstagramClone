using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task<List<User>> SearchUsersAsync(string search, int userId)
        {
            return await _context.Users.Where(u => u.Id != userId && u.Username.ToLower().Contains(search.ToLower())).ToListAsync();
        }
        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteUserByIdAsync(int userId)
        {
            var rowsAffect = await _context.Users.Where(u => u.Id == userId).ExecuteDeleteAsync();
            return rowsAffect > 0;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            var rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected > 0;
        }

        public async Task<Group> GetGroupByIdAsync(int groupId)
        {
            return await _context.Groups.Where(g => g.Id == groupId).FirstOrDefaultAsync();
        }
    }
}
