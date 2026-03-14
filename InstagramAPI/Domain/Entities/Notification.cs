namespace Domain.Entities
{
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int TriggerById { get; set; }
        public User TriggerBy { get; set; }

        public string Type { get; set; }

        public int? PostId { get; set; }
        public int? StoryId { get; set; }

        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
