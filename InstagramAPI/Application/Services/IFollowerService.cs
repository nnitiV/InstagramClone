
using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IFollowerService
    {
        Task<int> GetTotalFollowersAsync(int userId);
        Task<int> GetTotalFollowingAsync(int userId);
        Task<List<FollowerDto>> GetListOfFollowersAsync(int userId);
        Task<List<FollowerDto>> GetListOfFollowingAsync(int userId);
        Task FollowUserAsync(int followingUserId, int followedUserId);
        Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId);
        Task<bool> IsFollowingAsync(int followingUserId, int followedUserId);
    }
}
