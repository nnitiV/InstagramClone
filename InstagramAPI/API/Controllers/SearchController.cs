using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }
        [HttpGet]
        public async Task<IActionResult> SearchUser([FromQuery] string searchTerm)
        {
            int userId = User.GetUserId();
            List<ResponseUserDto> users = await _searchService.SearchUser(searchTerm, userId);
            return Ok(new { users });
        }
    }
}
