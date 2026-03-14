using Domain.Entities;

namespace Application.Interfaces
{
    public interface INotificationRepository
    {
        Task AddNotificationAsync(Notification notification);
        Task<bool> DeleteNotification(int receiverId, int triggerUserId);
        Task<List<Notification>> GetUserNotificationsAsync(int userId);
    }
}
