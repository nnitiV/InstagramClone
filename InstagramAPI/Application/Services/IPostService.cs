using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IPostService
    {
        Task<ResponsePostDto?> GetPostByIdAsync(int postId);
        Task<PagedResult<ResponsePostDto>> GetAllUserPostsAsync(int userId, int page, int pageSize);
        Task<int> GetUserPostCount(int userId);
        Task<int> AddPostAsync(CreatePostDto createPostDto, int userId);
        Task<bool> UpdatePostAsync(UpdatePostDto updatePostDto, int userId);
        Task<bool> DeletePostByIdAsync(int postId, int userId);
    }
}
