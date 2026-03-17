using Domain.Common;

namespace Domain.Entities
{
    public class Message: BaseEntity
    {
        public string Content { get; set; } = string.Empty;
        public DateTimeOffset SentAt { get; set; } = DateTimeOffset.UtcNow;
        public bool IsRead { get; set; } = false;
        public int SenderId { get; set; }
        public virtual User Sender { get; set; } = null!;
        public int? ReceiverId { get; set; }
        public virtual User? Receiver { get; set; } 
        public int? StoryId { get; set; }
        public virtual Story? Story { get; set; }
        public int? GroupId { get; set; }
        public virtual Group? Group { get; set; } 
    }
}
