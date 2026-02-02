using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
                return NotFound($"Couldn't find comment with id {commentId}");
            }
            return Ok(comment);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddComment(CreateCommentDto createCommentDto)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
            {
                return Unauthorized("Invalid token user ID");
            }
            if (createCommentDto == null)
            {
                return BadRequest("Comment can't be null.");
            }
            int createdCommentId = await _commentService.AddCommentAsync(createCommentDto, userId);
            return CreatedAtAction(nameof(GetCommentById), new { commentId = createdCommentId }, "Created comment with success!");
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateComment(CommentDto updateCommentDto)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
            {
                return Unauthorized("Invalid token user ID");
            }
            var wasUpdated = await _commentService.UpdateCommentAsync(updateCommentDto, userId);
            return Ok("Comment updated succesfully!");
        }
        [Authorize]
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
            {
                return Unauthorized("Invalid token user ID");
            }
            var wasUpdated = await _commentService.DeleteCommentByIdAsync(commentId, userId);
            return Ok("Deleted comment with success!");
        }
    }
}
