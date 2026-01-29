using Application.Dtos;
using Application.Services;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            ResponseUserDto? responseUserDto = null;
            responseUserDto = await _userService.GetById(id);
            if (responseUserDto == null)
            {
                return NotFound($"User with id {id} not found.");
            }

            return Ok(responseUserDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(CreateUserDto createUserDto)
        {
            int createdUserId = await _userService.AddUser(createUserDto);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUserId }, createUserDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            var wasDeleted = await _userService.DeleteUserById(id);
            if(!wasDeleted)
            {
                return NotFound($"Could not delete user with id {id} or didn't exist");
            }
            return Ok("User deleted succesfully.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync(UpdateUserDto updateUserDto)
        {
            bool wasUpdated = await _userService.UpdateUser(updateUserDto);
            if(!wasUpdated)
            {
                return NotFound("Could not update user.");
            }
            return Ok("User updated succesfully.");
        }
    }
}
