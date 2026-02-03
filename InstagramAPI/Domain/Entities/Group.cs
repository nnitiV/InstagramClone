using Domain.Common;

namespace Domain.Entities
{
    public class Group: BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? GroupImage { get; set; } = string.Empty;
        public virtual ICollection<GroupMember> Members { get; set; } = new List<GroupMember>();
        public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
