namespace Application.Dtos
{
    public class GroupDto
    {
        public string Name { get; set; } = string.Empty;
        public string? GroupImage { get; set; } = string.Empty;
        public virtual ICollection<GroupMemberDto> Members { get; set; } = new List<GroupMemberDto>();
        public virtual ICollection<MessageDto> Messages { get; set; } = new List<MessageDto>();
    }
}
