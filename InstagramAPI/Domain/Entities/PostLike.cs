using Domain.Common;

namespace Domain.Entities
{
    public class PostLike: BaseEntity
    {
        public int UserId { get; set; }
        public int PostId { get; set; }
    }
}
