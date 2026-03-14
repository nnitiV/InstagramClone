using Application.Dtos;
using Domain.Entities;

namespace Application.Services
{
    public interface INotificationService
    {
        Task AddNotificationAsync(NotificationDto notificationDto, int receiverId);
        Task<bool> DeleteNotification(int receiverId, int triggerUserId);
        Task<List<NotificationDto>> GetUserNotificationsAsync(int userId);
    }
}
