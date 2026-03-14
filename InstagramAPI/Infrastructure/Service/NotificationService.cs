using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Service
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationDispatcher _dispatcher;

        public NotificationService(INotificationRepository notificationRepository, INotificationDispatcher dispatcher)
        {
            _notificationRepository = notificationRepository;
            _dispatcher = dispatcher;
        }

        public async Task AddNotificationAsync(NotificationDto notificationDto, int receiverId)
        {
            if (notificationDto == null) throw new ArgumentNullException("Please, provide a notification.");

            var notification = new Notification
            {
                UserId = receiverId,
                TriggerById = notificationDto.TriggerById,
                Type = notificationDto.Type,
                Message = notificationDto.Message,
                PostId = notificationDto.PostId,
                StoryId = notificationDto.StoryId,
                IsRead = false,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _notificationRepository.AddNotificationAsync(notification);

            notificationDto.Id = notification.Id;
            notificationDto.CreatedAt = notification.CreatedAt;

            await _dispatcher.SendNotificationToUserAsync(receiverId, notificationDto);
        }

        public async Task<bool> DeleteNotification(int receiverId, int triggerUserId, string notificationType)
        {
            var deletedNotification = await _notificationRepository.DeleteNotification(receiverId, triggerUserId, notificationType);
            if (deletedNotification)
            {
                await _dispatcher.SendRemoveNotificationAsync(receiverId, triggerUserId, notificationType);
            }

            return deletedNotification;
        }

        public async Task<List<NotificationDto>> GetUserNotificationsAsync(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentOutOfRangeException("Please, provide a valid user id.");
            }

            List<Notification> notifications = await _notificationRepository.GetUserNotificationsAsync(userId);
            return [.. notifications.Select(n => new NotificationDto
            {
                Id = n.Id,
                Type = n.Type,
                Message = n.Message,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt,
                TriggerById = n.TriggerById,
                TriggerByUsername = n.TriggerBy.Username,
                TriggerByPhoto = n.TriggerBy.ProfilePictureUrl,
                PostId = n.PostId,
                StoryId = n.StoryId
            })];
        }
    }
}
