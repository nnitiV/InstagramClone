using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ResponseUserDto?> GetByIdAsync(int id)
        {
            User? user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new ResponseUserDto
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Email = user.Email,
                Bio = user.Bio,
                DateOfBirth = user.DateOfBirth,
                ProfilePictureUrl = user.ProfilePictureUrl,
                Age = user.Age,
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                PostsCount = user.PostsCount
            };
        }

        public async Task<ResponseUserDto?> GetUserByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username)) throw new BadRequestException("Username can't be empty!");

            User? userDB = await _userRepository.GetUserByUsernameAsync(username);
            if (userDB == null) return null;

            return new ResponseUserDto
            {
                Id = userDB.Id,
                Username = userDB.Username,
                Name = userDB.Name,
                Email = userDB.Email,
                Bio = userDB.Bio,
                DateOfBirth = userDB.DateOfBirth,
                Age = userDB.Age,
                ProfilePictureUrl = userDB.ProfilePictureUrl,
                FollowersCount = userDB.FollowersCount,
                FollowingCount = userDB.FollowingCount,
                PostsCount = userDB.PostsCount
            };
        }

        public async Task<ResponseUserDto?> GetUserByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) throw new BadRequestException("Email can't be empty!");

            User? userDB = await _userRepository.GetUserByEmailAsync(email);
            if (userDB == null) return null;

            return new ResponseUserDto
            {
                Id = userDB.Id,
                Username = userDB.Username,
                Name = userDB.Name,
                Email = userDB.Email,
                Bio = userDB.Bio,
                DateOfBirth = userDB.DateOfBirth,
                Age = userDB.Age,
                ProfilePictureUrl = userDB.ProfilePictureUrl,
                FollowersCount = userDB.FollowersCount,
                FollowingCount = userDB.FollowingCount,
                PostsCount = userDB.PostsCount
            };
        }

        public async Task<List<SearchUserDto>> SearchUsersAsync(string search, int userId)
        {
            if (string.IsNullOrWhiteSpace(search)) return new List<SearchUserDto>(); // Always return empty list, not null!

            List<User> users = await _userRepository.SearchUsersAsync(search, userId);
            return users.Select(u => new SearchUserDto
            {
                Id = u.Id,
                Username = u.Username,
                Name = u.Name,
                ProfilePictureUrl = u.ProfilePictureUrl,
            }).ToList();
        }

        public async Task<int> AddUserAsync(CreateUserDto userDto)
        {
            if (userDto == null) throw new BadRequestException("Please, provide a user.");

            User? userDB = await _userRepository.GetUserByEmailAsync(userDto.Email);
            if (userDB != null) throw new UserAlreadyExistsException("Email is already taken.");

            userDB = await _userRepository.GetUserByUsernameAsync(userDto.Username);
            if (userDB != null) throw new UserAlreadyExistsException("Username is already taken.");

            DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow); // Use UtcNow
            int age = today.Year - userDto.DateOfBirth.Year;
            if (today.DayOfYear < userDto.DateOfBirth.DayOfYear)
            {
                age--;
            }

            User user = new User
            {
                Username = userDto.Username,
                Name = userDto.Name,
                Email = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Bio = userDto.Bio,
                DateOfBirth = userDto.DateOfBirth,
                Age = age,
                ProfilePictureUrl = userDto.ProfilePictureUrl,
                FollowersCount = 0,
                FollowingCount = 0,
                PostsCount = 0,
            };

            await _userRepository.AddUserAsync(user);

            return user.Id;
        }

        public async Task<bool> DeleteUserByIdAsync(int userId)
        {
            return await _userRepository.DeleteUserByIdAsync(userId);
        }

        public async Task<bool> UpdateUserAsync(UpdateUserDto userDto, int userId)
        {
            if (userDto == null) throw new BadRequestException("Please, provide a valid user.");

            User? user = await _userRepository.GetByIdAsync(userDto.Id);
            if (user == null) throw new NotFoundException("Provided user doesn't exist.");

            if (user.Id != userId) throw new UnauthorizedAccessException("You can only update yourself.");

            if (!string.IsNullOrWhiteSpace(userDto.Username) &&
                !string.Equals(user.Username, userDto.Username, StringComparison.OrdinalIgnoreCase))
                user.Username = userDto.Username;

            if (!string.IsNullOrWhiteSpace(userDto.Name) &&
                !string.Equals(user.Name, userDto.Name, StringComparison.OrdinalIgnoreCase))
                user.Name = userDto.Name;

            if (!string.IsNullOrWhiteSpace(userDto.Email) &&
                !string.Equals(user.Email, userDto.Email, StringComparison.OrdinalIgnoreCase))
                user.Email = userDto.Email;

            if (!string.IsNullOrWhiteSpace(userDto.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            if (!string.IsNullOrWhiteSpace(userDto.Bio) &&
                !string.Equals(user.Bio, userDto.Bio, StringComparison.OrdinalIgnoreCase))
                user.Bio = userDto.Bio;

            if (!string.IsNullOrWhiteSpace(userDto.ProfilePictureUrl) &&
                !string.Equals(user.ProfilePictureUrl, userDto.ProfilePictureUrl, StringComparison.OrdinalIgnoreCase))
                user.ProfilePictureUrl = userDto.ProfilePictureUrl;

            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> UpdateUserInternallyAsync(UpdateUserDto userDto)
        {
            User? user = await _userRepository.GetByIdAsync(userDto.Id);
            if (user == null) throw new NotFoundException("Provided user doesn't exist.");

            if (!string.IsNullOrWhiteSpace(userDto.Username) &&
                !string.Equals(user.Username, userDto.Username, StringComparison.OrdinalIgnoreCase))
                user.Username = userDto.Username;

            if (!string.IsNullOrWhiteSpace(userDto.Name) &&
                !string.Equals(user.Name, userDto.Name, StringComparison.OrdinalIgnoreCase))
                user.Name = userDto.Name;

            if (!string.IsNullOrWhiteSpace(userDto.Email) &&
                !string.Equals(user.Email, userDto.Email, StringComparison.OrdinalIgnoreCase))
                user.Email = userDto.Email;

            if (!string.IsNullOrWhiteSpace(userDto.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            if (!string.IsNullOrWhiteSpace(userDto.Bio) &&
                !string.Equals(user.Bio, userDto.Bio, StringComparison.OrdinalIgnoreCase))
                user.Bio = userDto.Bio;

            if (!string.IsNullOrWhiteSpace(userDto.ProfilePictureUrl) &&
                !string.Equals(user.ProfilePictureUrl, userDto.ProfilePictureUrl, StringComparison.OrdinalIgnoreCase))
                user.ProfilePictureUrl = userDto.ProfilePictureUrl;

            // Handled nullable DTO counts beautifully
            user.FollowersCount = userDto.FollowersCount;
            user.FollowingCount = userDto.FollowingCount;
            user.PostsCount = userDto.PostsCount;

            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task<Group> GetGroupByIdAsync(int groupId)
        {
            return await _userRepository.GetGroupByIdAsync(groupId);
        }
    }
}