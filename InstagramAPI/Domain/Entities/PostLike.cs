using Domain.Common;

namespace Domain.Entities
{
    public class PostLike: BaseEntity
    {
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int PostId { get; set; }
        public virtual Post Post { get; set; } = null!;
    }
}
