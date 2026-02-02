namespace Application.Dtos
{
    public class CreateCommentDto
    {
        public string Text { get; set; } = string.Empty;
        public int PostId { get; set; }
        public int UserId { get; set; }
        public int? ParentCommentId { get; set; }
    }
}
