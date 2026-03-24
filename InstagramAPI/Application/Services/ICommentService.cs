using Application.Dtos;

namespace Application.Services
{
    public interface ICommentService
    {
        Task<List<CommentDto>> GetAllCommentsFromPostAsync(int currentUserId, int postId);
        Task<CommentDto?> GetCommentByIdAsync(int commentId);
        Task<int> AddCommentAsync(CreateCommentDto comment, int userId);
        Task DeleteCommentByIdAsync(int commentId, int userId);
        Task UpdateCommentAsync(CommentDto commentToUpdate, int userId);
    }
}
