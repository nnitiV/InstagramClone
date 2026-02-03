
using Domain.Common;

namespace Domain.Entities
{
    public class GroupMember: BaseEntity
    {
        public int GroupId { get; set; }
        public virtual Group Group { get; set; } = null!;
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public DateTimeOffset JoinedAt { get; set; } = DateTimeOffset.UtcNow;
        public bool IsAdmin { get; set; } = false;
    }
}
