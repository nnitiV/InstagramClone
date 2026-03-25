
using Application.Services;
using Domain.Exceptions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Runtime.CompilerServices;
using System.Runtime.Intrinsics.X86;


namespace Infrastructure.Service
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private const long MaxFileSizeBytes = 20971520;
        public FileService(IWebHostEnvironment env) 
        {
            _environment = env;
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                throw new BadRequestException("File is empty.");
            }
            if (file.Length > MaxFileSizeBytes)
            {
                throw new BadRequestException("File exceeds the maximum allowed size of 20MB.");
            }
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".jfif", ".mp4",
            ".webm",".ogg",".mov",".avi"};
            var extension = Path.GetExtension(file.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                throw new BadRequestException("Invalid file type.");
            }

            var fileName = $"{Guid.NewGuid()}{extension}";

            var webRootPath = _environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot");

            var uploadFolder = Path.Combine(webRootPath, "uploads");

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
