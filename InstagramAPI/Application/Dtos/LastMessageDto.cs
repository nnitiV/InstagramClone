namespace Application.Dtos
{
    public class LastMessageDto
    {
        public int Id { get; set; } // Pode ser o UserId ou o GroupId
        public string Name { get; set; } // Nome do usuário ou do grupo
        public string PictureUrl { get; set; } // Foto do perfil ou do grupo
        public string LastMessage { get; set; }
        public DateTimeOffset LastMessageAt { get; set; }
        public bool IsGroup { get; set; } // Essencial para o React saber onde clicar
        public int UnreadCount { get; set; }
    }
}
