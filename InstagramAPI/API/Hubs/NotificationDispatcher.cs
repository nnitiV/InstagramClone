using Application.Dtos;
using Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class NotificationDispatcher : INotificationDispatcher
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public NotificationDispatcher(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendNotificationToUserAsync(int receiverId, NotificationDto notificationDto)
        {
            await _hubContext.Clients.User(receiverId.ToString())
                                     .SendAsync("ReceiveNotification", notificationDto);
        }
        public async Task SendRemoveNotificationAsync(int receiverId, int triggerUserId, string type)
        {
            await _hubContext.Clients.User(receiverId.ToString())
                                     .SendAsync("RemoveNotification", triggerUserId, type);
        }
    }
}
