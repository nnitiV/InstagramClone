
using Domain.Common;
using Domain.Entities;

namespace Application.Dtos
{
    public class ResponsePostDto: BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Caption { get; set; } = string.Empty;
        public int UserId { get; set; }
        public ICollection<PostContent> Contents { get; set; } = new List<PostContent>();
    }
}
