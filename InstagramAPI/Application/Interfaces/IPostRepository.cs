using Application.Dtos;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IPostRepository
    {
        Task<Post?> GetPostByIdAsync(int postId);
        Task<List<Post>> GetAllUserPostsAsync(int userId, int page, int pageSize);
        Task<List<Post>> GetUserFeedAsync(int userId, int page, int pageSize);
        Task<int> GetUserPostCountAsync(int userId);
        Task AddPostAsync(Post post);
        Task<bool> UpdatePostAsync(Post updatePost);
        Task<bool> DeletePostByIdAsync(int postId, int userId);
    }
}
