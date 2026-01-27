using Domain.Common;

namespace Domain.Entities
{
    public class Follower: BaseEntity
    {
        public int UserIdFollowed { get; set; }
        public int UserIdFollowing { get; set; }
    }
}
