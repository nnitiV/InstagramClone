using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Application.Services;

namespace Infrastructure.Service
{
    public class SearchService: ISearchService
    {
        private readonly ISearchRepository _searchRepository;

        public SearchService(ISearchRepository searchRepository)
        {
            _searchRepository = searchRepository;
        }
        public async Task<List<ResponseUserDto>> SearchUser(string searchTerm, int userId)
        {
            if (searchTerm == null || searchTerm.Length == 0) throw new ArgumentException("Please, provide a valid search term.");

            List<User> users = await _searchRepository.SearchUser(searchTerm, userId);
            List<ResponseUserDto> results = new List<ResponseUserDto>();
            users.ForEach(user => results.Add(new ResponseUserDto
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                ProfilePictureUrl = user.ProfilePictureUrl,
                FollowersCount = user.FollowersCount,
            }));
            return results;
        }
    }
}
