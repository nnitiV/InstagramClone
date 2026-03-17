namespace Application.Dtos
{
    public class SendMessageDto
    {
        public int? ReceiverId { get; set; }
        public int? GroupId { get; set; }
        public int? StoryId { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
