
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Service
{
    public class FollowerService : IFollowerService
    {
        private readonly IUserService _userService;
        private readonly IFollowerRepository _followerRepository;
        public FollowerService(IFollowerRepository followerRepository, IUserService userService)
        {
            _followerRepository = followerRepository;
            _userService = userService;
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

            ResponseUserDto userDto = await _userService.GetById(follower.UserIdFollowed);
            if (userDto != null)
            {
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = userDto.Id,
                    FollowingCount = userDto.FollowingCount,
                    FollowersCount = userDto.FollowersCount + 1
                });
            }
            userDto = await _userService.GetById(follower.UserIdFollowing);
            if (userDto != null)
            {
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = userDto.Id,
                    FollowingCount = userDto.FollowingCount + 1,
                    FollowersCount = userDto.FollowersCount
                });
            }
            await _followerRepository.FollowUserAsync(follower);
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
            if (!await IsFollowingAsync(followingUserId, followedUserId))
            {
                throw new ArgumentException("You are already not following this user.");
            }
            ResponseUserDto userDto = await _userService.GetById(followedUserId);
            if (userDto != null)
            {
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = userDto.Id,
                    FollowingCount = userDto.FollowingCount,
                    FollowersCount = userDto.FollowersCount - 1
                });
            }
            userDto = await _userService.GetById(followingUserId);
            if (userDto != null)
            {
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = userDto.Id,
                    FollowingCount = userDto.FollowingCount - 1,
                    FollowersCount = userDto.FollowersCount
                });
            }
            return await _followerRepository.UnfollowUserAsync(followingUserId, followedUserId);
        }

        public async Task<List<FollowerDto>> GetListOfFollowersAsync(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            List<Follower> followers = await _followerRepository.GetListOfFollowersAsync(userId);
            return [.. followers.Select(f => new FollowerDto
            {
                UserId = f.UserFollowing.Id,
                Name = f.UserFollowing.Name,
                Username = f.UserFollowing.Username,
                ProfilePictureUrl = f.UserFollowing.ProfilePictureUrl
            })];
        }

        public async Task<List<FollowerDto>> GetListOfFollowingAsync(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            List<Follower> followers = await _followerRepository.GetListOfFollowingAsync(userId);
            return [.. followers.Select(f => new FollowerDto
            {
                UserId = f.UserFollowed.Id,
                Name = f.UserFollowed.Name,
                Username = f.UserFollowed.Username,
                ProfilePictureUrl = f.UserFollowed.ProfilePictureUrl
            })];
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

        public async Task<bool> IsFollowingAsync(int currentUserId, int targetUserId)
        {
            if(currentUserId == targetUserId)
            {
                throw new ArgumentException("You can't check yourself.");
            }
            if (currentUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid following user id.");
            }
            if (targetUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid follower user id.");
            }
            return await _followerRepository.IsFollowingAsync(currentUserId, targetUserId);
        }
    }
}
