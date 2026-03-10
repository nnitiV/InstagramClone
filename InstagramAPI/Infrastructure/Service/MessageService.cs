using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;

namespace Infrastructure.Service
{
    public class MessageService : IMessageService
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
            if (otherUser == null)
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
                ReceiverId = m.ReceiverId, // Keep it nullable in DTO if possible
                Content = m.Content,
                SentAt = m.SentAt,
                IsRead = m.IsRead
            }).ToList();
        }

        public async Task<MessageDto> SendMessageAsync(int currentUserId, SendMessageDto messageDto)
        {
            if (string.IsNullOrEmpty(messageDto.Content))
            {
                throw new ArgumentException("Please, provide the content of the message.");
            }
            if (messageDto.ReceiverId == null && messageDto.GroupId == null)
            {
                throw new ArgumentException("You must provide either a ReceiverId or a GroupId.");
            }
            Message message = new Message
            {
                SenderId = currentUserId,
                Content = messageDto.Content,
                SentAt = DateTimeOffset.UtcNow,
                IsRead = false,
            };

            if (messageDto.GroupId.HasValue)
            {
                message.GroupId = messageDto.GroupId;
            }
            else if (messageDto.ReceiverId.HasValue)
            {
                var receiver = await _userService.GetById(messageDto.ReceiverId.Value);
                if (receiver == null)
                {
                    throw new NotFoundException($"User with ID {messageDto.ReceiverId} not found.");
                }
                message.ReceiverId = messageDto.ReceiverId.Value;
            }

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
        public async Task<Group> CreateGroupAsync(int creatorId, CreateGroupDto groupDto)
        {
            Group group = new Group
            {
                Name = groupDto.Name,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await _messageRepository.CreateGroupAsync(group);

            await _messageRepository.AddMemberToGroupAsync(new GroupMember
            {
                GroupId = group.Id,
                UserId = creatorId,
                IsAdmin = true
            });

            foreach (var userId in groupDto.MemberIds.Where(id => id != creatorId).Distinct())
            {
                await _messageRepository.AddMemberToGroupAsync(new GroupMember
                {
                    GroupId = group.Id,
                    UserId = userId,
                    IsAdmin = false
                });
            }
            return group;
        }

        public async Task<List<MessageDto>> GetGroupChatHistoryAsync(int groupId)
        {
            List<Message> messages = await _messageRepository.GetGroupChatHistory(groupId);
            return messages.Select(m => new MessageDto
            {
                Id = m.Id,
                SenderId = m.SenderId,
                SenderUsername = m.Sender?.Username ?? "Unknown",
                SenderPhotoUrl = m.Sender?.ProfilePictureUrl ?? "",
                GroupId = m.GroupId,
                Content = m.Content,
                SentAt = m.SentAt,
                IsRead = m.IsRead
            }).ToList();
        }

        public async Task<List<LastMessageDto>> GetLastMessagesSentToUser(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            List<Message> messages = await _messageRepository.GetLastMessagesSentToUser(userId);
            List<Message> groupMessages = await _messageRepository.GetGroupLastMessagesSentToUser(userId);

            List<LastMessageDto> result = new();
            foreach (var m in messages)
            {
                result.Add(new LastMessageDto
                {
                    Id = m.Id,
                    IsGroup = false,
                    ReceiverId = m.ReceiverId.Value,
                    SenderId = m.SenderId,
                    LastMessage = m.Content,
                    LastMessageAt = m.SentAt,
                    Name = m.Receiver.Username,
                    PictureUrl = m.Receiver.ProfilePictureUrl,
                });
            }
            foreach (var m in groupMessages)
            {
                if (m.Group != null)
                {
                    result.Add(new LastMessageDto
                    {
                        Id = m.Id,
                        IsGroup = true,
                        LastMessage = m.Content,
                        LastMessageAt = m.SentAt,
                        SenderId = m.SenderId,
                        Name = m.Group.Name,
                        PictureUrl = m.Group.GroupImage,
                    });
                }
            }

            return result.OrderByDescending(m => m.LastMessageAt).ToList();
        }
    }
}
