
using Domain.Common;
using Domain.Entities;

namespace Application.Dtos
{
    public class ResponsePostDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Caption { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorProfilePicture { get; set; } = string.Empty;
        public List<string> ContentUrls { get; set; } = new();
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public bool IsLiked { get; set; } 
        public DateTimeOffset CreatedAt { get; set; }
    }
}
