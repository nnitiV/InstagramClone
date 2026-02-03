
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Service
{
    public class FollowerService : IFollowerService
    {
        private readonly IFollowerRepository _followerRepository;
        public FollowerService(IFollowerRepository followerRepository)
        {
            _followerRepository = followerRepository;
        }

        public async Task FollowUserAsync(Follower follower)
        {
            if(follower == null || follower.UserIdFollowed <= 0 || follower.UserIdFollowing <= 0)
            {
                throw new ArgumentException("Please, provide valid values.");
            }
            if (follower.UserIdFollowing == follower.UserIdFollowed)
            {
                throw new ArgumentException("You cannot follow yourself.");
            }
            if (await IsFollowingAsync(follower.UserIdFollowing, follower.UserIdFollowed))
            {
                throw new ArgumentException("You are already following this user.");
            }
            await _followerRepository.FollowUserAsync(follower);
        }

        public async Task<List<FollowerDto>> GetListOfFollowersAsync(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            List<Follower> followers = await _followerRepository.GetListOfFollowersAsync(userId);
            List<FollowerDto> followerDtos = new List<FollowerDto>();
            foreach (Follower follower in followers)
            {
                followerDtos.Add(new FollowerDto
                {
                    UserId = follower.UserFollowing.Id,
                    Name = follower.UserFollowing.Name,
                    ProfilePictureUrl = follower.UserFollowing.ProfilePictureUrl,
                    Username = follower.UserFollowing.Username,
                });
            }
            return followerDtos;
        }

        public async Task<List<FollowerDto>> GetListOfFollowingAsync(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            List<Follower> followers = await _followerRepository.GetListOfFollowingAsync(userId);
            List<FollowerDto> followerDtos = new List<FollowerDto>();
            foreach (Follower follower in followers)
            {
                followerDtos.Add(new FollowerDto
                {
                    UserId = follower.UserFollowed.Id,
                    Name = follower.UserFollowed.Name,
                    ProfilePictureUrl = follower.UserFollowed.ProfilePictureUrl,
                    Username = follower.UserFollowed.Username,
                });
            }
            return followerDtos;
        }

        public async Task<int> GetTotalFollowersAsync(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _followerRepository.GetTotalFollowersAsync(userId);
        }

        public async Task<int> GetTotalFollowingAsync(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _followerRepository.GetTotalFollowingAsync(userId);
        }

        public async Task<bool> IsFollowingAsync(int followingUserId, int followedUserId)
        {
            if (followingUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid following user id.");
            }
            if (followedUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid follower user id.");
            }
            return await _followerRepository.IsFollowingAsync(followingUserId, followedUserId);
        }

        public async Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId)
        {
            if (followingUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid following user id.");
            }
            if (followedUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid follower user id.");
            }
            return await _followerRepository.UnfollowUserAsync(followingUserId, followedUserId);
        }
    }
}
