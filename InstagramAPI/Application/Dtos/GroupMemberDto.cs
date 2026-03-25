namespace Application.Dtos
{
    public class GroupMemberDto
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public DateTimeOffset JoinedAt { get; set; }
        public bool IsAdmin { get; set; }
    }
}