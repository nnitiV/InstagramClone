using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SearchRepository: ISearchRepository
    {
        private readonly AppDbContext _context;
        public SearchRepository(AppDbContext context) { 
            _context = context;
        }

        public async Task<List<User>> SearchUser(string searchTerm, int userId)
        {
            return await _context.Users.Where(u => u.Id != userId && u.Username.ToLower().Contains(searchTerm.ToLower())).Take(20).ToListAsync();
        }
    }
}
