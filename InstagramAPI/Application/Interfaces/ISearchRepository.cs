using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISearchRepository
    {
        Task<List<User>> SearchUser(string searchTerm, int userId);
    }
}
