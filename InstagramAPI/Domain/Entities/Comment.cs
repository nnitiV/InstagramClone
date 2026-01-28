using Domain.Common;

namespace Domain.Entities
{
    public class Comment: BaseEntity
    {
        public string Text { get; set; } = string.Empty;
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
