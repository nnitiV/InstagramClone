using Domain.Common;

namespace Domain.Entities
{
    public class CommentLike: BaseEntity
    {
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; } = null!;
    }
}
