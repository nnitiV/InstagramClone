namespace Application.Dtos
{
    public class ResponseUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public int PostsCount { get; set; }
    }
}
