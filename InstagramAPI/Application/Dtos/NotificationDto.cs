namespace Application.Dtos
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

        public int TriggerById { get; set; }
        public string TriggerByUsername { get; set; }
        public string TriggerByPhoto { get; set; }

        public int? PostId { get; set; }
        public int? StoryId { get; set; }
    }
}
