using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IUserService
    {
        Task<ResponseUserDto?> GetByIdAsync(int id);
        Task<ResponseUserDto> GetUserByUsernameAsync(string username);
        Task<ResponseUserDto?> GetUserByEmailAsync(string email);
        Task<List<SearchUserDto>> SearchUsersAsync(string search, int userId);
        Task<int> AddUserAsync(CreateUserDto user);
        Task<bool> UpdateUserAsync(UpdateUserDto user, int userId);
        Task<bool> UpdateUserInternallyAsync(UpdateUserDto userDto);
        Task<bool> DeleteUserByIdAsync(int userId);
        Task<Group> GetGroupByIdAsync(int groupId);
    }
}
