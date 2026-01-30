using Domain.Entities;

namespace Application.Dtos
{
    public class UpdatePostDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Caption { get; set; } = string.Empty;
        public List<string> ContentUrls { get; set; } = new List<string>();
    }
}
