
using Domain.Entities;

namespace Application.Services
{
    public interface IFollowerService
    {
        Task<int> GetTotalFollowersAsync(int userId);
        Task<int> GetTotalFollowingAsync(int userId);
        Task FollowUserAsync(Follower follower);
        Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId);
        Task<bool> IsFollowingAsync(int followingUserId, int followedUserId);
    }
}
