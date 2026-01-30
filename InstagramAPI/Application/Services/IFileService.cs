using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file);
    }
}
