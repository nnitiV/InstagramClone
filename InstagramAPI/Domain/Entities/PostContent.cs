using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class PostContent: BaseEntity
    {
        public string ContentUrl { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int OrderIndex { get; set; }
    }
}
