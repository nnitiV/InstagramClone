using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            return Ok(new { token = await _authService.LoginAsync(login) });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {
            await _authService.RegisterAsync(register);
            return Ok(new { message = "User registered successfully!" });
        }
    }
}
