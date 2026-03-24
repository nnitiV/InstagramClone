using Domain.Entities;

namespace Application.Interfaces
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message message);
        Task<List<Message>> GetChatHistoryAsync(int userId, int otherUserId);
        Task<List<Message>> GetGroupChatHistoryAsync(int groupId);
        Task CreateGroupAsync(Group group);
        Task AddMemberToGroupAsync(GroupMember groupMember);
        Task<Group?> GetGroupWithMembersAsync(int groupid);

        Task<List<Message>> GetLastMessagesSentToUserAsync(int userId);
        Task<List<Message>> GetGroupLastMessagesSentToUserAsync(int userId);
    }
}
