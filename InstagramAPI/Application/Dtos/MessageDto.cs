namespace Application.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderName { get; set; }
        public string SenderPhoto { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverPhoto { get; set; }
        public int? ReceiverId { get; set; }
        public int? GroupId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTimeOffset SentAt { get; set; }
        public bool IsRead { get; set; }
    }
}
