using Domain.Common;

namespace Domain.Entities
{
    public class StoryLike : BaseEntity
    {
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int StoryId { get; set; }
        public virtual Story Story { get; set; } = null!;
        public DateTimeOffset CreatedAt { get; set; }
    }
}
