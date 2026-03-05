using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            ResponseUserDto? responseUserDto = null;
            responseUserDto = await _userService.GetById(id);
            if (responseUserDto == null)
            {
                return NotFound(new { message = $"User with id {id} not found." });
            }

            return Ok(responseUserDto);
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest(new { message = "Username cannot be empty." });
            Console.WriteLine("Username: " + username);
            ResponseUserDto user = await _userService.GetUserByUsername(username);
            if (user == null) return NotFound(new { message = "User not found." });
            return Ok(new { user });
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(CreateUserDto createUserDto)
        {
            int createdUserId = await _userService.AddUser(createUserDto);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUserId }, createUserDto);
        }
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserById()
        {
            int userId = User.GetUserId();
            var wasDeleted = await _userService.DeleteUserById(userId);
            if(!wasDeleted)
            {
                return NotFound(new { message = $"Could not delete user with id {userId} or didn't exist" });
            }
            return Ok(new { message = "User deleted successfully" });
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync(UpdateUserDto updateUserDto)
        {
            Console.WriteLine(updateUserDto);
            int userId = User.GetUserId();
            Console.WriteLine(userId);
            bool wasUpdated = await _userService.UpdateUser(updateUserDto, userId);
            if(!wasUpdated)
            {
                return NotFound(new { message = "Could not update user." });
            }
            return Ok(new { message = "User updated successfully" });
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            int userId = User.GetUserId();
            var users = await _userService.SearchUsersAsync(search, userId);
            return Ok(new { result = users });
        }
    }
}
