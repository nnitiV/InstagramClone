
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
        private readonly INotificationService _notificationService;
        public FollowerService(IFollowerRepository followerRepository, IUserService userService, INotificationService notificationService)
        {
            _followerRepository = followerRepository;
            _userService = userService;
            _notificationService = notificationService;
        }

        public async Task FollowUserAsync(Follower follower)
        {
            if (follower == null || follower.UserIdFollowed <= 0 || follower.UserIdFollowing <= 0)
                throw new ArgumentException("Please, provide valid values.");

            if (follower.UserIdFollowing == follower.UserIdFollowed)
                throw new ArgumentException("You cannot follow yourself.");

            if (await IsFollowingAsync(follower.UserIdFollowing, follower.UserIdFollowed))
                throw new ArgumentException("You are already following this user.");

            ResponseUserDto followedUser = await _userService.GetById(follower.UserIdFollowed);
            ResponseUserDto followingUser = await _userService.GetById(follower.UserIdFollowing);

            if (followedUser == null || followingUser == null)
            {
                throw new ArgumentException("One or both users do not exist.");
            }

            await _followerRepository.FollowUserAsync(follower);

            await _userService.UpdateUserInternally(new UpdateUserDto
            {
                Id = followedUser.Id,
                FollowingCount = followedUser.FollowingCount,
                FollowersCount = followedUser.FollowersCount + 1
            });

            await _userService.UpdateUserInternally(new UpdateUserDto
            {
                Id = followingUser.Id,
                FollowingCount = followingUser.FollowingCount + 1,
                FollowersCount = followingUser.FollowersCount
            });

            await _notificationService.AddNotificationAsync(new NotificationDto
            {
                TriggerById = followingUser.Id,
                TriggerByUsername = followingUser.Username,
                TriggerByPhoto = followingUser.ProfilePictureUrl,
                Type = "Follow",
                Message = "começou a seguir você.",
                PostId = null,
                StoryId = null
            }, follower.UserIdFollowed);
        }

        public async Task<bool> UnfollowUserAsync(int followingUserId, int followedUserId)
        {
            if (followingUserId <= 0)
                throw new ArgumentException("Please, provide a valid following user id.");

            if (followedUserId <= 0)
                throw new ArgumentException("Please, provide a valid follower user id.");

            if (!await IsFollowingAsync(followingUserId, followedUserId))
                throw new ArgumentException("You are not following this user.");

            ResponseUserDto followedUser = await _userService.GetById(followedUserId);
            ResponseUserDto followingUser = await _userService.GetById(followingUserId);

            if (followedUser == null || followingUser == null)
                throw new ArgumentException("One or both users do not exist.");

            bool isUnfollowed = await _followerRepository.UnfollowUserAsync(followingUserId, followedUserId);

            if (!isUnfollowed)
                return false;

            await _userService.UpdateUserInternally(new UpdateUserDto
            {
                Id = followedUser.Id,
                FollowingCount = followedUser.FollowingCount,
                FollowersCount = followedUser.FollowersCount - 1
            });

            await _userService.UpdateUserInternally(new UpdateUserDto
            {
                Id = followingUser.Id,
                FollowingCount = followingUser.FollowingCount - 1,
                FollowersCount = followingUser.FollowersCount
            });

            await _notificationService.DeleteNotification(followedUserId, followingUserId);

            return true;
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
