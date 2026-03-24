using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostById(int postId)
        {
            int currentUserId = User.GetUserId();
            ResponsePostDto? post = await _postService.GetPostByIdAsync(currentUserId, postId);
            if (post == null)
            {
                return NotFound(new { message = $"Couldn't find post with id {postId}" });
            }
            return Ok(new { post });
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllUserPostsByUserId(int userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            int currentUserId = User.GetUserId();
            PagedResult<ResponsePostDto>? posts = await _postService.GetAllUserPostsAsync(currentUserId, userId, page, pageSize);
            if (posts == null)
            {
                return NotFound(new { message = $"Couldn't find posts from user with id {userId}" });
            }
            return Ok(new { posts });
        }
        [HttpGet("feed")]
        public async Task<IActionResult> GetUserFeed([FromQuery] DateTime? cursor = null, [FromQuery] int pageSize = 10)
        {
            int userId = User.GetUserId();
            var feed = await _postService.GetUserFeedAsync(userId, cursor, pageSize);
            return Ok(new { feed });
        }
        [HttpPost]
        public async Task<IActionResult> AddPost(CreatePostDto post)
        {
            int userId = User.GetUserId();
            CreatedPostDto postToReturn = await _postService.AddPostAsync(post, userId);
            var response = new { message = "Added post with success!", post = postToReturn };
            return CreatedAtAction(nameof(GetPostById), new { postId = postToReturn.Id }, response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePost(UpdatePostDto post)
        {
            int userId = User.GetUserId();
            await _postService.UpdatePostAsync(post, userId);
            return Ok(new { message = "Post updated successfully!", id = post.Id });
        }
        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            if (postId <= 0)
            {
                return BadRequest(new { message = "Please, provide a valid post id." });
            }
            int userId = User.GetUserId();
            await _postService.DeletePostByIdAsync(postId, userId);
            return Ok(new { message = "Post deleted succcessfully!", id = postId });
        }
    }
}
