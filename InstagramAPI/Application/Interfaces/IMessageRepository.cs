using Domain.Entities;

namespace Application.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message message);
        Task<List<Message>> GetChatHistoryAsync(int userId, int otherUserId);
        Task<List<Message>> GetGroupChatHistory(int groupid);
        Task CreateGroupAsync(Group group);
        Task AddMemberToGroupAsync(GroupMember groupMember);
        Task<Group?> GetGroupWithMembersAsync(int groupid);

        Task<List<Message>> GetLastMessagesSentToUser(int userId);
        Task<List<Message>> GetGroupLastMessagesSentToUser(int userId);
    }
}
