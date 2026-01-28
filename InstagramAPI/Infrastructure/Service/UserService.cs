using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using DevOne.Security.Cryptography.BCrypt;
using Domain.Entities;
using Domain.Exceptions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                PostsCount = user.PostsCount
            };

            return userDto;
        }

        public async Task AddUser(CreateUserDto userDto)
        {
            if(userDto == null)
            {
                throw new ArgumentException("Please, provide an user.");
            }

            User? userDB = await _userRepository.GetUserByEmail(userDto.Email);
            if(userDB != null)
            {
                throw new UserAlreadyExistsException("User is alraedy taken.");
            }

            User user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Bio = userDto.Bio,
                ProfilePictureUrl = userDto.ProfilePictureUrl,
                FollowersCount = 0,
                FollowingCount = 0,
                PostsCount = 0,
            };
            
            await _userRepository.AddUser(user);
        }

        public async Task<bool> DeleteUserById(int userId)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid id.");
            }

            return await _userRepository.DeleteUserById(userId);
        }


        public async Task<bool> UpdateUser(UpdateUserDto userDto)
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
