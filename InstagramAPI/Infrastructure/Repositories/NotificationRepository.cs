using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class NotificationRepository: INotificationRepository
    {
        private readonly AppDbContext _context;
        public NotificationRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddNotificationAsync(Notification notification)
        {
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteNotification(int receiverId, int triggerUserId, string notificationType)
        {
            var rowsAffected = await _context.Notifications
                .Where(n => n.UserId == receiverId
                         && n.TriggerById == triggerUserId
                         && n.Type == notificationType)
                .ExecuteDeleteAsync();

            return rowsAffected > 0;
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(int userId)
        {
            return await _context.Notifications.Include(n => n.TriggerBy).Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt).ToListAsync();
        }
    }
}
