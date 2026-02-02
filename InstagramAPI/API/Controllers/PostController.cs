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
                return NotFound(new { message = $"Couldn't find post with id {postId}" });
            }
            return Ok(post);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllUserPostsByUserId(int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            PagedResult<ResponsePostDto>? posts = await _postService.GetAllUserPostsAsync(userId, page, pageSize);
            if (posts == null)
            {
                return NotFound(new { message = $"Couldn't find posts from user with id {userId}" });
            }
            return Ok(posts);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddPost(CreatePostDto post)
        {
            int userId = User.GetUserId();
            if (post == null)
            {
                return BadRequest(new { message = "Post can't be null." });
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
                return BadRequest(new { message = "Post can't be null." });
            }
            int userId = User.GetUserId();
            var wasUpdated = await _postService.UpdatePostAsync(post, userId);
            if(!wasUpdated)
            {
                return NotFound(new { message = "Post not found or you are not the owner." });
            }

            return Ok(new { message = "Post updated successfully!", id = post.Id });
        }

        [Authorize]
        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            if(postId <= 0)
            {
                return BadRequest(new { message = "Please, provide a valid post id." });
            }
            int userId = User.GetUserId();
            var wasDeleted = await _postService.DeletePostByIdAsync(postId, userId);
            if (!wasDeleted)
            {
                return NotFound(new { message = "Post not found or you are not the owner." });
            }

            return Ok(new { message = "Post deleted succcessfully!", id = postId });
        }
    }
}
