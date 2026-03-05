using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface ISearchService
    {
        Task<List<ResponseUserDto>> SearchUser(string searchTerm, int userId);
    }
}
