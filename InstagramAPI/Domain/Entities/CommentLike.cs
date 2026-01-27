using Domain.Common;

namespace Domain.Entities
{
    public class CommentLike: BaseEntity
    {
        public int UserId { get; set; }
        public int CommentId { get; set; }
    }
}
