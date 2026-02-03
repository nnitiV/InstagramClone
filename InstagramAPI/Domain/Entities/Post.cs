using Domain.Common;

namespace Domain.Entities
{
    public class Post: BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public int UserId { get; set; }
        public virtual User User { get; set; } = null;
        public virtual List<PostLike> PostLikes { get; set; } = new List<PostLike>();
        public ICollection<PostContent> Contents { get; set; } = new List<PostContent>();
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
