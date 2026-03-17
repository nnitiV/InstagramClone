using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using System.Reflection;

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
            List<Message> messages = await _messageRepository.GetChatHistoryAsync(currentUserId, otherUserId);

            return messages.Select(m =>
            {
                MessageDto messageToReturn = new MessageDto
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    SenderName = m.Sender.Username,
                    SenderPhoto = m.Sender.ProfilePictureUrl,
                    ReceiverName = m.Receiver.Username,
                    ReceiverPhoto = m.Receiver.ProfilePictureUrl,
                    ReceiverId = m.ReceiverId,
                    Content = m.Content,
                    SentAt = m.SentAt,
                    IsRead = m.IsRead
                };
                if (m.StoryId != null) messageToReturn.StoryId = m.StoryId;
                if (m.GroupId != null) messageToReturn.GroupId = m.GroupId;
                return messageToReturn;
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
            if(messageDto.StoryId.HasValue)
            {
                message.StoryId = messageDto.StoryId.Value;
            }

            await _messageRepository.AddMessageAsync(message);
            var sender = await _userService.GetById(currentUserId);
            var receive = await _userService.GetById(messageDto.ReceiverId.Value);

            MessageDto messageToReturn = new MessageDto
            {
                Id = message.Id,
                Content = message.Content,
                SenderId = message.SenderId,
                ReceiverId = message.ReceiverId.Value,
                SenderName = sender.Username,
                SenderPhoto = sender.ProfilePictureUrl,
                ReceiverName = receive.Username,
                ReceiverPhoto = receive.ProfilePictureUrl
            };
            if (message.StoryId.HasValue) messageToReturn.StoryId = message.StoryId;
            if (message.GroupId.HasValue) messageToReturn.GroupId = message.GroupId;
            return messageToReturn;
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
                SenderName = m.Sender.Username,
                SenderPhoto = m.Sender.ProfilePictureUrl,
                ReceiverName = m.Receiver.Username,
                ReceiverPhoto = m.Receiver.ProfilePictureUrl,
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
                LastMessageDto lastMessage = new LastMessageDto
                {
                    Id = m.Id,
                    IsGroup = false,
                    ReceiverId = m.ReceiverId.Value,
                    SenderId = m.SenderId,
                    LastMessage = m.Content,
                    LastMessageAt = m.SentAt,
                };
                if (m.ReceiverId.Value == userId)
                {
                    lastMessage.Name = m.Sender.Username;
                    lastMessage.PictureUrl = m.Sender.ProfilePictureUrl;
                }
                else
                {
                    lastMessage.Name = m.Receiver.Username;
                    lastMessage.PictureUrl = m.Receiver.ProfilePictureUrl;
                }
                result.Add(lastMessage);
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
