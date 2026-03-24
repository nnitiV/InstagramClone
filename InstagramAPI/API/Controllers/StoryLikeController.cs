using API.Extensions;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/storyLike")]
    public class StoryLikeController : ControllerBase
    {
        private readonly IStoryLikeService _storyLikeService;
        public StoryLikeController(IStoryLikeService storyLikeService)
        {
            this._storyLikeService = storyLikeService;
        }
        [Authorize]
        [HttpPost("{storyId}")]
        public async Task<IActionResult> LikeStory(int storyId)
        {
            int userId = User.GetUserId();
            await _storyLikeService.LikeStoryAsync(storyId, userId);
            return Ok(new { message = "Post liked successfully" });
        }
        [Authorize]
        [HttpDelete("{storyId}")]
        public async Task<IActionResult> UnlikeStory(int storyId)
        {
            int userId = User.GetUserId();
            await _storyLikeService.UnlikeStoryAsync(storyId, userId);
            return Ok(new { message = "Post unliked successfully" });
        }
        [Authorize]
        [HttpGet("{storyId}/status")]
        public async Task<IActionResult> HasUserLikedIt(int storyId)
        {
            int userId = User.GetUserId();
            return Ok(await _storyLikeService.HasUserLikedItAsync(storyId, userId));
        }
    }
}
