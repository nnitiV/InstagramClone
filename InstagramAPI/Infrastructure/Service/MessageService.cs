using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Service
{
    public class MessageService: IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserService _userService;
        public MessageService(IMessageRepository messageRepository, IUserService userService)
        {
            _messageRepository = messageRepository;
            _userService = userService;
        }

        public async Task<List<MessageDto>> GetChatHistoryAsync(int currentUserId, int otherUserId)
        {
            var otherUser = await _userService.GetById(otherUserId);
            if(otherUser == null)
            {
                throw new NotFoundException($"User with ID {otherUserId} not found.");
            }
            var messages = await _messageRepository.GetChatHistoryAsync(currentUserId, otherUserId);
            
            return messages.Select(m => new MessageDto
            {
                Id = m.Id,
                SenderId = m.SenderId,
                SenderUsername = m.Sender?.Username ?? "Unknown",
                SenderPhotoUrl = m.Sender?.ProfilePictureUrl ?? "",
                ReceiverId = m.ReceiverId,
                Content = m.Content,
                SentAt = m.SentAt,
                IsRead = m.IsRead
            }).ToList();
        }

        public async Task<MessageDto> SendMessageAsync(int currentUserId, SendMessageDto messageDto)
        {
            if(currentUserId <= 0)
            {
                throw new ArgumentException("Please, provide a valid current user id.");
            }
            if (messageDto.ReceiverId <= 0)
            {
                throw new ArgumentException("Please, provide a valid receiver id.");
            }
            if(string.IsNullOrEmpty(messageDto.Content))
            {
                throw new ArgumentException("Please, provide the content of the message.");
            }
            var receiver = await _userService.GetById(messageDto.ReceiverId);
            if(receiver == null)
            {
                throw new NotFoundException($"User with ID {messageDto.ReceiverId} not found.");
            }
            Message message = new Message
            {
                SenderId = currentUserId,
                Content = messageDto.Content,
                ReceiverId = messageDto.ReceiverId,
                SentAt = DateTime.UtcNow,
                IsRead = false,
            };

            await _messageRepository.AddMessageAsync(message);
            return new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                ReceiverId = message.ReceiverId,
                Content = message.Content,
                SentAt = message.SentAt,
                IsRead = message.IsRead
            }; 
        }
    }
}
