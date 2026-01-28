using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IUserService
    {
        Task<ResponseUserDto?> GetById(int id);
        Task AddUser(CreateUserDto user);
        Task<bool> UpdateUser(UpdateUserDto user);
        Task<bool> DeleteUserById(int userId);
    }
}
