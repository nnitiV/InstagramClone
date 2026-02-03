using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Infrastructure.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public AuthService(IUserRepository userRepository, IConfiguration configuration, IUserService userService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _userService = userService;
        }
        public async Task RegisterAsync(RegisterDto registerDto)
        {
            if(string.IsNullOrEmpty(registerDto.Username))
            {
                throw new ArgumentException("Username can't be null.");
            }
            if (string.IsNullOrEmpty(registerDto.Email))
            {
                throw new ArgumentException("Email can't be null.");
            }
            if (string.IsNullOrEmpty(registerDto.Password))
            {
                throw new ArgumentException("Password can't be null.");
            }
            if (!IsPasswordStrong(registerDto.Password))
            {
                throw new ArgumentException("Please, provide a strong password (8 characters, include number, lower and upper case letter and symbols.");
            }

            CreateUserDto createUserDto = new CreateUserDto
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = registerDto.Password,
                Name = registerDto.Name,
                DateOfBirth = registerDto.DateOfBirth
            };
            await _userService.AddUser(createUserDto);
        }
        private bool IsPasswordStrong(string password)
        {
            // 1. Check Length (e.g., min 8 chars)
            if (password.Length < 8) return false;

            // 2. Check for Uppercase
            if (!Regex.IsMatch(password, "[A-Z]")) return false;

            // 3. Check for Lowercase
            if (!Regex.IsMatch(password, "[a-z]")) return false;

            // 4. Check for Digits
            if (!Regex.IsMatch(password, "[0-9]")) return false;

            // 5. Check for Special Characters (Optional but recommended)
            if (!Regex.IsMatch(password, "[!@#$%^&*(),.?\":{}|<>]")) return false;

            return true;
        }
        public async Task<string> Login(LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Login) || string.IsNullOrEmpty(loginDto.Password))
            {
                throw new ArgumentException("Invalid username or password.");
            }
            User? user = await _userRepository.GetUserByEmail(loginDto.Login);
            if (user == null)
            {
                user = await _userRepository.GetUserByUsername(loginDto.Login);
                if (user == null)
                {
                    throw new ArgumentException("Invalid username or password.");
                }
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                throw new ArgumentException("Invalid username or password.");
            }

            return CreateToken(user);
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
