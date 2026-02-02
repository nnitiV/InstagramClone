using Domain.Common;

namespace Application.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty; 
        public string? ProfilePictureUrl { get; set; }
        public int? ParentCommentId { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
