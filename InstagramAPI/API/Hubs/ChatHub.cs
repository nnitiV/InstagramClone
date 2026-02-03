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

            await Clients.User(sendMessageDto.ReceiverId.ToString()).SendAsync("ReceiveMessage", savedMessage);

            await Clients.Caller.SendAsync("ReceiveMessage", savedMessage);
        }
    }
}
