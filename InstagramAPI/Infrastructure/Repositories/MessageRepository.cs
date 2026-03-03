using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;
        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddMemberToGroupAsync(GroupMember groupMember)
        {
            await _context.GroupMembers.AddAsync(groupMember);
            await _context.SaveChangesAsync();
        }

        public async Task AddMessageAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }

        public async Task CreateGroupAsync(Group group)
        {
            await _context.Groups.AddAsync(group);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Message>> GetChatHistoryAsync(int userId, int otherUserId)
        {
            return await _context.Messages.Where(m => (m.SenderId == userId && m.ReceiverId == otherUserId) || (m.SenderId == otherUserId && m.ReceiverId == userId))
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<List<Message>> GetGroupChatHistory(int groupid)
        {
            return await _context.Messages.Include(m => m.Sender).Where(m => m.GroupId == groupid).OrderBy(m => m.SentAt).ToListAsync();
        }

        public async Task<Group?> GetGroupWithMembersAsync(int groupId)
        {
            return await _context.Groups
                .Include(g => g.Members)
                .ThenInclude(gm => gm.User)
                .FirstOrDefaultAsync(g => g.Id == groupId);
        }

        public async Task<List<Message>> GetLastMessagesSentToUser(int userId)
        {
            var lastMessagesIds = await _context.Messages
        .Where(m => (m.ReceiverId == userId || m.SenderId == userId) && m.GroupId == null)
        .GroupBy(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
        .Select(g => g.OrderByDescending(m => m.SentAt).Select(m => m.Id).FirstOrDefault())
        .ToListAsync();

            // Agora buscamos as mensagens completas com os Includes usando os IDs que encontramos
            return await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => lastMessagesIds.Contains(m.Id))
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<List<Message>> GetGroupLastMessagesSentToUser(int userId)
        {
            var groupIds = await _context.GroupMembers
        .Where(gm => gm.UserId == userId)
        .Select(gm => gm.GroupId)
        .ToListAsync();

            var lastGroupMessageIds = await _context.Messages
                .Where(m => m.GroupId != null && groupIds.Contains(m.GroupId.Value))
                .GroupBy(m => m.GroupId)
                .Select(g => g.OrderByDescending(m => m.SentAt).Select(m => m.Id).FirstOrDefault())
                .ToListAsync();

            return await _context.Messages
                .Include(m => m.Group)
                .Include(m => m.Sender)
                .Where(m => lastGroupMessageIds.Contains(m.Id))
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
        }
    }
}
