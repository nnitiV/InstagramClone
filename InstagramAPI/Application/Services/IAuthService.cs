using Application.Dtos;

namespace Application.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDto loginDto);
        Task RegisterAsync(RegisterDto registerDto);
    }
}
