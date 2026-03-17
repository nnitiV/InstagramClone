using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IPostService
    {
        Task<ResponsePostDto?> GetPostByIdAsync(int currentUserId, int postId);
        Task<PagedResult<ResponsePostDto>> GetAllUserPostsAsync(int currentUserId, int userId, int page, int pageSize);
        Task<int> GetUserPostCount(int userId);
        Task<List<ResponsePostDto>> GetUserFeedAsync(int currentUserId, DateTime? cursor, int pageSize);
        Task<CreatedPostDto> AddPostAsync(CreatePostDto createPostDto, int userId);
        Task<bool> UpdatePostAsync(UpdatePostDto updatePostDto, int userId);
        Task<bool> DeletePostByIdAsync(int postId, int userId);
    }
}
