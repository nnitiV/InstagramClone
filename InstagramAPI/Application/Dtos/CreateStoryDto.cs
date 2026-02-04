using Microsoft.AspNetCore.Http;


namespace Application.Dtos
{
    public class CreateStoryDto
    {
        public IFormFile File { get; set; }
    }
}
