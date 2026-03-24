using Application.Dtos;

namespace Application.Services
{
    public interface INotificationService
    {
        Task AddNotificationAsync(NotificationDto notificationDto, int receiverId);
        Task DeleteNotificationAsync(int receiverId, int triggerUserId, string notificationType);
        Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);
    }
}
