using Application.Dtos;

namespace Application.Services
{
    public interface ICommentService
    {
        Task<List<CommentDto>> GetAllCommentsFromPostAsync(int postId);
        Task<CommentDto?> GetCommentByIdAsync(int commentId);
        Task AddCommentAsync(CreateCommentDto comment);
        Task<bool> DeleteCommentByIdAsync(int commentId, int userId);
        Task<bool> UpdateCommentAsync(CommentDto commentToUpdate);
    }
}
