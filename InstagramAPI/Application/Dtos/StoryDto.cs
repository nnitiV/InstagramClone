using Microsoft.AspNetCore.Http;

namespace Application.Dtos
{
    public class StoryDto
    {
        public int Id { get; set; }
        public string MediaUrl { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public DateTimeOffset ExpiresAt { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
