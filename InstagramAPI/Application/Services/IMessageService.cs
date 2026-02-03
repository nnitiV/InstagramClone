using Application.Dtos;

namespace Application.Services
{
    public interface IMessageService
    {
        Task<MessageDto> SendMessageAsync(int currentUserId, SendMessageDto messageDto);
        Task<List<MessageDto>> GetChatHistoryAsync(int currentUserId, int otherUserid);
    }
}
