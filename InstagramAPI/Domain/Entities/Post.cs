using Domain.Common;

namespace Domain.Entities
{
    public class Post: BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public int UserId { get; set; }
        public ICollection<PostContent> Content { get; set; } = new List<PostContent>();
    }
}
