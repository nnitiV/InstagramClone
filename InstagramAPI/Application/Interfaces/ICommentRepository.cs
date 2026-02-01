using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsFromPostAsync(int postId);
        Task<Comment> GetCommentByIdAsync(int commentId);
        Task AddCommentAsync(Comment comment);
        Task<bool> DeleteCommentAsync(int commentId, int userId);
        Task<bool> UpdateCommentAsync(Comment comment, int userId);
    }
}
