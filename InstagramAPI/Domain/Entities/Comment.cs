using Domain.Common;

namespace Domain.Entities
{
    public class Comment: BaseEntity
    {
        public string Text { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int UserId { get; set; }
    }
}
