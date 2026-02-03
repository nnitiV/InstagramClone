namespace Application.Dtos
{
    public class CreateGroupDto
    {
        public string Name { get; set; } = string.Empty;
        public List<int> MemberIds { get; set; } = [];
    }
}
