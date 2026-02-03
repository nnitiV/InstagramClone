using API.Extensions;
using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/followers")]
    public class FollowerController : ControllerBase
    {
        private readonly IFollowerService _followerService;

        public FollowerController(IFollowerService followerService)
        {
            _followerService = followerService;
        }

        [HttpGet("{userId}/count")]
        public async Task<IActionResult> GetTotalFollowers(int userId)
        {
            return Ok(new { followersCount = await _followerService.GetTotalFollowersAsync(userId) });
        }

        [HttpGet("{userId}/following/count")]
        public async Task<IActionResult> GetTotalFollowing(int userId)
        {
            return Ok(new { followingCount = await _followerService.GetTotalFollowingAsync(userId) });
        }
        [HttpGet("{userId}/followers")]
        public async Task<IActionResult> GetListOfFollowersAsync(int userId)
        {
            return Ok(new { followers = await _followerService.GetListOfFollowersAsync(userId) });
        }
        [HttpGet("{userId}/following")]
        public async Task<IActionResult> GetListOfFollowingAsync(int userId)
        {
            return Ok(new { following = await _followerService.GetListOfFollowingAsync(userId) });
        }

        [Authorize]
        [HttpPost("{targetUserId}")]
        public async Task<IActionResult> FollowUser(int targetUserId)
        {
            int currentUserId = User.GetUserId();

            Follower follower = new Follower
            {
                UserIdFollowing = currentUserId,
                UserIdFollowed = targetUserId,
                CreatedAt = DateTimeOffset.UtcNow
            };

            await _followerService.FollowUserAsync(follower);
            return Ok(new { message = "User followed successfully!" });
        }

        [Authorize]
        [HttpDelete("{targetUserId}")]
        public async Task<IActionResult> UnfollowUser(int targetUserId)
        {
            int currentUserId = User.GetUserId();
            await _followerService.UnfollowUserAsync(currentUserId, targetUserId);
            return Ok(new { message = "User unfollowed successfully!" });
        }

        [Authorize]
        [HttpGet("{targetUserId}/status")]
        public async Task<IActionResult> IsFollowing(int targetUserId)
        {
            int currentUserId = User.GetUserId();
            return Ok(new { isFollowing = await _followerService.IsFollowingAsync(currentUserId, targetUserId) });
        }
    }
}