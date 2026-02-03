using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpGet("allComments/{postId}")]
        public async Task<IActionResult> GetCommentsByPostId(int postId)
        {
            var comments = await _commentService.GetAllCommentsFromPostAsync(postId);
            return Ok(comments);
        }
        [HttpGet("comment/{commentId}")]
        public async Task<IActionResult> GetCommentById(int commentId)
        {
            var comment = await _commentService.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                return NotFound(new { message = $"Couldn't find comment with id {commentId}" });
            }
            return Ok(comment);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddComment(CreateCommentDto createCommentDto)
        {
            int userId = User.GetUserId();
            if (createCommentDto == null)
            {
                return BadRequest(new { message = "Comment can't be null." });
            }
            int createdCommentId = await _commentService.AddCommentAsync(createCommentDto, userId);
            return CreatedAtAction(nameof(GetCommentById), new { commentId = createdCommentId }, new { message = "Comment created successfully", id = createdCommentId });
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateComment(CommentDto updateCommentDto)
        {
            int userId = User.GetUserId();
            var wasUpdated = await _commentService.UpdateCommentAsync(updateCommentDto, userId);
            return Ok(new { message = "Comment updated successfully" });
        }
        [Authorize]
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            int userId = User.GetUserId();
            var wasUpdated = await _commentService.DeleteCommentByIdAsync(commentId, userId);
            return Ok(new { message = "Comment deleted successfully" });
        }
    }
}
