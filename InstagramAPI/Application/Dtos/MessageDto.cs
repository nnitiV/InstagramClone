namespace Application.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderName { get; set; } = string.Empty;
        public string SenderPhoto { get; set; } = string.Empty;
        public string ReceiverName { get; set; } = string.Empty;
        public string ReceiverPhoto { get; set; } = string.Empty;
        public int? ReceiverId { get; set; }
        public int? GroupId { get; set; }
        public int? StoryId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTimeOffset SentAt { get; set; }
        public bool IsRead { get; set; }
    }
}
