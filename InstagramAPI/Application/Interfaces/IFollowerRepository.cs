using Domain.Entities;

namespace Application.Interfaces
{
    public interface IFollowerRepository
    {
        Task<int> GetTotalFollowersAsync(int userId);
        Task<int> GetTotalFollowingAsync(int userId);
        Task FollowUserAsync(Follower follower);
        Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId);
        Task<bool> IsFollowingAsync(int followingUserId, int followedUserId);
    }
}
