using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;

namespace Infrastructure.Service
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ResponseUserDto?> GetById(int id)
        {
            if(id <= 0)
            {
                throw new ArgumentException("Please, provide a valid id");
            }

            User? user = await _userRepository.GetById(id);
            if(user == null)
            {
                return null;
            }

            ResponseUserDto userDto = new ResponseUserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Bio = user.Bio,
                DateOfBirth = user.DateOfBirth,
                Age = user.Age,
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                PostsCount = user.PostsCount
            };

            return userDto;
        }

        public async Task<ResponseUserDto?> GetUserByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username can't be null!");
            }
            User? userDB = await _userRepository.GetUserByUsername(username);
            if (userDB == null)
            {
                return null;
            }
            ResponseUserDto? userDto = new ResponseUserDto
            {
                Id = userDB.Id,
                Username= userDB.Username,
                Email = userDB.Email,
                Bio = userDB.Bio,
                DateOfBirth = userDB.DateOfBirth,
                Age = userDB.Age,
                FollowersCount= userDB.FollowersCount,
                FollowingCount= userDB.FollowingCount,
                PostsCount= userDB.PostsCount
            };
            return userDto;
        }

        public async Task<ResponseUserDto?> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email can't be null!");
            }
            User? userDB = await _userRepository.GetUserByEmail(email);
            if (userDB == null)
            {
                return null;
            }
            ResponseUserDto? userDto = new ResponseUserDto
            {
                Id = userDB.Id,
                Username = userDB.Username,
                Email = userDB.Email,
                Bio = userDB.Bio,
                DateOfBirth = userDB.DateOfBirth,
                Age = userDB.Age,
                FollowersCount = userDB.FollowersCount,
                FollowingCount = userDB.FollowingCount,
                PostsCount = userDB.PostsCount
            };
            return userDto;
        }
        public async Task<List<SearchUserDto>> SearchUsersAsync(string search)
        {
            if(string.IsNullOrEmpty(search))
            {
                return null;
            }
            List<User> users = await _userRepository.SearchUsersAsync(search);
            return users.Select(u => new SearchUserDto
            {
                Id = u.Id,
                Username = u.Username,
                Name = u.Name,
                ProfilePictureUrl = u.ProfilePictureUrl,
            }).ToList();
        }

        public async Task<int> AddUser(CreateUserDto userDto)
        {
            if(userDto == null)
            {
                throw new ArgumentException("Please, provide an user.");
            }

            User? userDB = await _userRepository.GetUserByEmail(userDto.Email);
            if(userDB != null)
            {
                throw new UserAlreadyExistsException("Email is already taken.");
            }
            userDB = await _userRepository.GetUserByUsername(userDto.Username);
            if(userDB != null)
            {
                throw new UserAlreadyExistsException("Username is already taken.");
            }

            DateOnly today = DateOnly.FromDateTime(DateTime.Today);

            int age = today.Year - userDto.DateOfBirth.Year;

            if(today.DayOfYear < userDto.DateOfBirth.DayOfYear)
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
            
            await _userRepository.AddUser(user);

            return user.Id;
        }

        public async Task<bool> DeleteUserById(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid id.");
            }

            return await _userRepository.DeleteUserById(userId);
        }


        public async Task<bool> UpdateUser(UpdateUserDto userDto, int userId)
        {
            if(userDto == null)
            {
                throw new ArgumentException("Please, provide a valid user.");
            }

            User? user = await _userRepository.GetById(userDto.Id);
            if (user == null)
            {
                throw new ArgumentException("Provided user doesn't exist.");
            }
            if(user.Id != userId)
            {
                throw new UnauthorizedAccessException("You can only delete yourself.");
            }

            user.Username = userDto.Username;
            user.Email = userDto.Email;
            if(!string.IsNullOrEmpty(userDto.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            }
            user.Bio = userDto.Bio;
            user.ProfilePictureUrl = userDto.ProfilePictureUrl;

            return await _userRepository.UpdateUser(user);
        }
    }
}
