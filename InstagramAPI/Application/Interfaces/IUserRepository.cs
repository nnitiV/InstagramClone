using Application.Dtos;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUserByUsername(string username);
        Task<List<User>> SearchUsersAsync(string search);
        Task AddUser(User user);
        Task<bool> UpdateUser(User user);
        Task<bool> DeleteUserById(int userId);
        Task<Group> GetGroupById(int groupId);
    }
}
