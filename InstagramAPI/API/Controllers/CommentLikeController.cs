using API.Extensions;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/commentLike")]
    public class CommentLikeController: ControllerBase  
    {
        private readonly ICommentLikeService _commentLikeService;
        public CommentLikeController(ICommentLikeService commentLikeService)
        {
            _commentLikeService = commentLikeService;
        }
        [HttpGet("{commentId}/count")]
        public async Task<IActionResult> GetAmountOfLikes(int commentId)
        {
            return Ok(new { count = await _commentLikeService.GetAmountOfLikesAsync(commentId) });
        }
        [Authorize]
        [HttpPost("{commentId}")]
        public async Task<IActionResult> LikeComment(int commentId)
        {
            int userId = User.GetUserId();
            await _commentLikeService.LikeCommentAsync(commentId, userId);
            return Ok(new { message = "Comment liked successfully" });
        }
        [Authorize]
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> UnlikeComment(int commentId)
        {
            int userId = User.GetUserId();
            await _commentLikeService.UnlikeCommentAsync(commentId, userId);
            return Ok(new { message = "Unliked successfully" });
        }
        [Authorize]
        [HttpGet("{commentId}/status")]
        public async Task<IActionResult> HasUserLikedIt(int postId)
        {
            int userId = User.GetUserId();
            return Ok(await _commentLikeService.HasUserLikedItAsync(postId, userId));
        }
    }
}
