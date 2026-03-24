using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsFromPostAsync(int postId);
        Task<Comment?> GetCommentByIdAsync(int commentId);
        Task AddCommentAsync(Comment comment);
        Task UpdateCommentAsync();
        Task<bool> DeleteCommentByIdAsync(int commentId, int userId);
    }
}
