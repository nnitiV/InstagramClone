using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IUserService
    {
        Task<ResponseUserDto?> GetById(int id);
        Task<ResponseUserDto> GetUserByUsername(string username);
        Task<ResponseUserDto?> GetUserByEmail(string email);
        Task<List<SearchUserDto>> SearchUsersAsync(string search, int userId);
        Task<int> AddUser(CreateUserDto user);
        Task<bool> UpdateUser(UpdateUserDto user, int userId);
        Task<bool> DeleteUserById(int userId);
        Task<Group> GetGroupById(int groupId);
    }
}
