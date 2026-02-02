using API.Extensions;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/postLike")]
    public class PostLikeController : ControllerBase
    {
        private readonly IPostLikeService _postLikeService;
        public PostLikeController(IPostLikeService postLikeService)
        {
            _postLikeService = postLikeService;
        }
        [HttpGet("{postId}/count")]
        public async Task<IActionResult> GetAmountOfLikes(int postId)
        {
            return Ok(new { count = await _postLikeService.GetAmountOfLikesAsync(postId) });
        }
        [Authorize]
        [HttpPost("{postId}")]
        public async Task<IActionResult> LikePost(int postId)
        {
            int userId = User.GetUserId();
            await _postLikeService.LikePostAsync(postId, userId);
            return Ok(new { message = "Post liked successfully" });
        }
        [Authorize]
        [HttpDelete("{postId}")]
        public async Task<IActionResult> UnlikePost(int postId)
        {
            int userId = User.GetUserId();
            await _postLikeService.UnlikePostAsync(postId, userId);
            return Ok(new { message = "Post unliked successfully" });
        }
        [Authorize]
        [HttpGet("{postId}/status")]
        public async Task<IActionResult> HasUserLikedIt(int postId)
        {
            int userId = User.GetUserId();
            return Ok(await _postLikeService.HasUserLikedItAsync(postId, userId));
        }
    }
}
