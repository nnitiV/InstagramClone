using Application.Dtos;

namespace Application.Interfaces
{
    public interface INotificationDispatcher
    {
        Task SendNotificationToUserAsync(int receiverId, NotificationDto notificationDto);
        Task SendRemoveNotificationAsync(int receiverId, int triggerUserId, string type);
    }
}
