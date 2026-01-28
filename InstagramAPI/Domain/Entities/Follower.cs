using Domain.Common;

namespace Domain.Entities
{
    public class Follower: BaseEntity
    {
        public int UserIdFollowed { get; set; }
        public virtual User UserFollowed { get; set; } = null!;
        public int UserIdFollowing { get; set; }
        public virtual User UserFollowing { get; set; } = null!;
    }
}
