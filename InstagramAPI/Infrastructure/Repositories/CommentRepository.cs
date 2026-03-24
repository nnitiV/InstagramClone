using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentRepository: ICommentRepository
    {
        private readonly AppDbContext _context;
        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllCommentsFromPostAsync(int postId)
        {
            return await _context.Comments.Include(c => c.User).Where(c => c.PostId == postId).ToListAsync();
        }
        public async Task<Comment?> GetCommentByIdAsync(int commentId)
        {
            return await _context.Comments.Include(c => c.User).Where(c => c.Id == commentId).FirstOrDefaultAsync();
        }
        public async Task AddCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteCommentByIdAsync(int commentId, int userId)
        {
            var rowsChanged = await _context.Comments.Where(c => c.Id == commentId && c.UserId == userId).ExecuteDeleteAsync();
            return rowsChanged > 0;
        }
        public async Task UpdateCommentAsync()
        {
             await _context.SaveChangesAsync();
        }
    }
}
