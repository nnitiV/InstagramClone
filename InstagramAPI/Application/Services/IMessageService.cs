using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface IMessageService
    {
        Task<MessageDto> SendMessageAsync(int currentUserId, SendMessageDto messageDto);
        Task<List<MessageDto>> GetChatHistoryAsync(int currentUserId, int otherUserid);
        Task<Group> CreateGroupAsync(int creatorId, CreateGroupDto groupDto);
        Task<List<MessageDto>> GetGroupChatHistoryAsync(int groupId);

        Task<List<LastMessageDto>> GetLastMessagesSentToUser(int userId);
    }
}
