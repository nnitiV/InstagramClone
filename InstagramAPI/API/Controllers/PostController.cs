using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController: ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostById(int postId)
        {
            ResponsePostDto? post = await _postService.GetPostByIdAsync(postId);
            if(post == null)
            {
                return NotFound($"Couldn't find post with id {postId}");
            }
            return Ok(post);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllUserPostsByUserId(int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            PagedResult<ResponsePostDto>? posts = await _postService.GetAllUserPostsAsync(userId, page, pageSize);
            if (posts == null)
            {
                return NotFound($"Couldn't find posts from user with id {userId}");
            }
            return Ok(posts);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddPost(CreatePostDto post)
        {
            int? userIdOrNull = User.GetUserId();
            int userId = userIdOrNull.Value;
            if (post == null)
            {
                return BadRequest("Post can't be null.");
            }
            int postId = await _postService.AddPostAsync(post, userId);
            var response = new { message = "Added post with success!", id = postId };
            return CreatedAtAction(nameof(GetPostById), new { postId = postId }, response);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdatePost(UpdatePostDto post)
        {
            if (post == null)
            {
                return BadRequest("Post can't be null.");
            }
            int? userIdOrNull = User.GetUserId();
            int userId = userIdOrNull.Value;
            var wasUpdated = await _postService.UpdatePostAsync(post, userId);
            if(!wasUpdated)
            {
                return NotFound("Post not found or you are not the owner.");
            }

            return Ok(new { message = "Post updated successfully!", id = post.Id });
        }

        [Authorize]
        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            if(postId <= 0)
            {
                return BadRequest("Please, provide a valid post id.");
            }
            int? userIdOrNull = User.GetUserId();
            int userId = userIdOrNull.Value;
            var wasDeleted = await _postService.DeletePostByIdAsync(postId, userId);
            if (!wasDeleted)
            {
                return NotFound("Post not found or you are not the owner.");
            }

            return Ok(new { message = "Post deleted succcessfully!", id = postId });
        }
    }
}
