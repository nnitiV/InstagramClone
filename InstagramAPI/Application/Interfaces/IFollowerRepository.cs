using Domain.Entities;

namespace Application.Interfaces
{
    public interface IFollowerRepository
    {
        Task<int> GetTotalFollowersAsync(int userId);
        Task<int> GetTotalFollowingAsync(int userId);
        Task<List<Follower>> GetListOfFollowersAsync(int userId);
        Task<List<Follower>> GetListOfFollowingAsync(int userId);
        Task AddFollowAsync(Follower follower);
        Task<bool> DeleteFollowerAsync(int followingUserId, int followedUserId);
        Task<bool> IsFollowingAsync(int followingUserId, int followedUserId);
    }
}
