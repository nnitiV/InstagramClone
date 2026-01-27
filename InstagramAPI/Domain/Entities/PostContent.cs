using Domain.Enums;

namespace Domain.Entities
{
    public class PostContent
    {
        public int Id { get; set; }
        public string ContentUrl { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int OrderIndex { get; set; }
        public MediaType MediaType { get; set; }
    }
}
