namespace Domain.Entities
{
    public class Story
    {
        public int Id { get; set; }
        public string MediaUrl { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset ExpiresAt { get; set; }
    }
}
