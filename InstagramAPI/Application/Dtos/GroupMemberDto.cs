namespace Application.Dtos
{
    public class GroupMemberDto
    {
        public class GroupMember
        {
            public int GroupId { get; set; }
            public int UserId { get; set; }
            public DateTimeOffset JoinedAt { get; set; } = DateTimeOffset.UtcNow;
            public bool IsAdmin { get; set; } = false;
        }
    }
