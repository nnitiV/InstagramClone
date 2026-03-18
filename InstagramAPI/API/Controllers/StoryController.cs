using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/story")]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;
        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveStories()
        {
            int userId = User.GetUserId();
            List<StoryDto> stories = await _storyService.GetActiveStoriesAsync(userId);
            return Ok(new { stories });
        }
        [HttpGet("{storyId}/status")]
        public async Task<IActionResult> CheckIfStoryIsActive(int storyId)
        {
            return Ok(await _storyService.CheckIfStoryStillActive(storyId));
        }
        [HttpPost]
        public async Task<IActionResult> CreateStory([FromForm] CreateStoryDto storyDto)
        {
            int userId = User.GetUserId();
            var createdStory = await _storyService.CreateStoryAsync(userId, storyDto);
            return CreatedAtAction(nameof(GetActiveStories), new { id = createdStory.Id }, createdStory);
        }
    }
}
