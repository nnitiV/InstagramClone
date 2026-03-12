using API.Extensions;
using Application.Dtos;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    [Authorize]
    public class ChatHub: Hub
    {
        private readonly IMessageService _messageService;
        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(SendMessageDto sendMessageDto)
        {
            var userId = Context.User.GetUserId();

            var savedMessage = await _messageService.SendMessageAsync(userId, sendMessageDto);
            if (sendMessageDto.GroupId.HasValue)
            {
                await Clients.Group(sendMessageDto.GroupId.Value.ToString()).SendAsync("ReceiveMessage", savedMessage);
            }
            else if (sendMessageDto.ReceiverId.HasValue)
            {
                await Clients.User(sendMessageDto.ReceiverId.Value.ToString()).SendAsync("ReceiveMessage", savedMessage);

                await Clients.Caller.SendAsync("ReceiveMessage", savedMessage);
            }
        }
        public async Task JoinGroup(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
        }
        public async Task LeaveGroup(int groupId)
        {   
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }
    }
}
