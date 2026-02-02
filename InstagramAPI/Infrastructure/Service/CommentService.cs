using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Service
{
    internal class CommentService: ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostService _postService;
        private readonly IUserService _userService;
        public CommentService(ICommentRepository commentRepository, IPostService postService, IUserService userService)
        {
            _commentRepository = commentRepository;
            _postService = postService;
            _userService = userService;
        }
        public async Task<List<CommentDto>> GetAllCommentsFromPostAsync(int postId)
        {
            if(postId <= 0)
            {
                throw new ArgumentException("Post id can't be null.");
            }
            ResponsePostDto? post = await _postService.GetPostByIdAsync(postId);
            if (post == null)
            {
                return null;
            }
            List<Comment> comments = await _commentRepository.GetAllCommentsFromPostAsync(postId);
            List<CommentDto> result = new List<CommentDto>();
            foreach (Comment comment in comments)
            {
                result.Add(new CommentDto
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    PostId = comment.PostId,
                    UserId = comment.UserId,
                    Username = comment.User.Username,
                    ProfilePictureUrl = comment.User.ProfilePictureUrl,
                    ParentCommentId = comment.ParentCommentId,
                    CreatedAt = comment.CreatedAt,
                });
            }
            return result;
        }
        public async Task<CommentDto?> GetCommentByIdAsync(int commentId)
        {
            if(commentId <= 0)
            {
                throw new ArgumentException("Comment id is invalid.");
            }
            Comment? comment = await _commentRepository.GetCommentByIdAsync(commentId);
            if(comment == null)
            {
                return null;
            }
            CommentDto result = new CommentDto
            {
                Id = comment.Id,
                Text = comment.Text,
                PostId = comment.PostId,
                UserId = comment.UserId,
                Username = comment.User.Username,
                ProfilePictureUrl = comment.User.ProfilePictureUrl,
                ParentCommentId = comment.ParentCommentId,
                CreatedAt = comment.CreatedAt,
            };
            return result;
        }
        public async Task AddCommentAsync(CreateCommentDto comment)
        {
            if(comment == null)
            {
                throw new ArgumentException("Comment can't be null.");
            }
            if(string.IsNullOrEmpty(comment.Text))
            {
                throw new ArgumentException("Please, insert a text.");
            }
            if(comment.Text.Length > 255)
            {
                throw new ArgumentException("Comment text can't be bigger than 255 characters.");
            }
            if(comment.UserId <= 0)
            {
                throw new ArgumentException("Invalid user id.");
            }
            if(comment.PostId <= 0)
            {
                throw new ArgumentException("Invalid post id.");
            }
            ResponsePostDto? postDto = await _postService.GetPostByIdAsync(comment.PostId); 
            if (postDto == null)
            {
                throw new ArgumentException($"Post {comment.PostId} not found.");
            }
            ResponseUserDto? userDto = await _userService.GetById(comment.UserId); 
            if (userDto == null)
            {
                throw new ArgumentException($"Post {comment.PostId} not found.");
            }
            Comment commentToSave = new Comment
            {
                Text = comment.Text,
                PostId = comment.PostId,
                UserId = comment.UserId,
                ParentCommentId = comment.ParentCommentId,
                CreatedAt = DateTimeOffset.UtcNow,
            };
            await _commentRepository.AddCommentAsync(commentToSave);
        }
        public async Task<bool> DeleteCommentByIdAsync(int commentId, int userId)
        {
            if (commentId <= 0)
            {
                throw new ArgumentException("Comment id is invalid.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("User id is invalid.");
            }
            ResponseUserDto? userDto = await _userService.GetById(userId);
            if (userDto == null)
            {
                return false;
            }
            return await _commentRepository.DeleteCommentByIdAsync(commentId, userId);
        }
        public async Task<bool> UpdateCommentAsync(CommentDto commentToUpdate)
        {
            if (commentToUpdate == null)
            {
                throw new ArgumentException("Comment can't be null.");
            }
            if(commentToUpdate.Id <= 0)
            {
                throw new ArgumentException("Comment id can't be null.");
            }
            Comment? comment = await _commentRepository.GetCommentByIdAsync(commentToUpdate.Id);
            if(comment == null)
            {
                return false;
            }
            if(comment.UserId != commentToUpdate.UserId) 
            {
                throw new UnauthorizedAccessException("You can only edit your own comments.");
            }
            comment.Text = commentToUpdate.Text;
            return await _commentRepository.UpdateCommentAsync();
        }
    }
}
