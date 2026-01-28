using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);
        Task<User?> GetUserByEmail(string email);
        Task AddUser(User user);
        Task<bool> UpdateUser(User user);
        Task<bool> DeleteUserById(int userId);
    }
}
