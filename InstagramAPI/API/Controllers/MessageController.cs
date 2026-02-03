using API.Extensions;
using Application.Dtos;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/messages")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }
        [HttpGet("{otherUserId}")]
        public async Task<IActionResult> GetChatHistory(int otherUserId)
        {
            var currentUserId = User.GetUserId();
            var messages = await _messageService.GetChatHistoryAsync(currentUserId, otherUserId);
            return Ok(new { messages = messages });
        }
        [HttpPost]
        public async Task<IActionResult> SendMessage(SendMessageDto sendMessageDto)
        {
            var currentUserId = User.GetUserId();
            var message = await _messageService.SendMessageAsync(currentUserId, sendMessageDto);
            return Ok(new { message = message });
        }
        [HttpGet("groups/{groupId}")]
        public async Task<IActionResult> GetGroupHistory(int groupId)
        {
            List<MessageDto> messages = await _messageService.GetGroupChatHistoryAsync(groupId);
            return Ok(new { messages = messages });
        }
        [HttpPost("groups")]
        public async Task<IActionResult> CreateGroup(CreateGroupDto createGroupDto)
        {
            var currentUserId = User.GetUserId();
            Group group = await _messageService.CreateGroupAsync(currentUserId, createGroupDto);
            return Ok(new { group = group });
        }
    }
}
