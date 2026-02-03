using Domain.Entities;

namespace Application.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message message);
        Task<List<Message>> GetChatHistoryAsync(int userId, int otherUserId);
    }
}
