namespace Domain.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public int UserId { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public ICollection<PostContent> Content { get; set; } = new List<PostContent>();
    }
}
