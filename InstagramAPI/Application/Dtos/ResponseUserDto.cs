namespace Application.Dtos
{
    public class ResponseUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public int Age { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public int PostsCount { get; set; }
    }
}
