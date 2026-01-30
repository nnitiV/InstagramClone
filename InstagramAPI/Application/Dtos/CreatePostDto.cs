using Domain.Common;
using Domain.Entities;

namespace Application.Dtos
{
    public class CreatePostDto
    {
        public string Title { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public ICollection<string> ContentUrls { get; set; } = new List<string>();

    }
}
