
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Runtime.CompilerServices;


namespace Infrastructure.Service
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        public FileService(IWebHostEnvironment env) 
        {
            _environment = env;
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                throw new ArgumentException("File is empty.");
            }
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                throw new ArgumentException("Invalid file type. Only images are allowed for now.");
            }

            var fileName = $"{Guid.NewGuid()}{extension}";

            var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            string filePath = Path.Combine(uploadFolder, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"uploads/{fileName}";
        }
    }
}
