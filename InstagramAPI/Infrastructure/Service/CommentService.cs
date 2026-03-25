using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;

namespace Infrastructure.Service
{
    public class CommentService: ICommentService
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
        public async Task<List<CommentDto>> GetAllCommentsFromPostAsync(int currentUserId, int postId)
        {
            if(postId <= 0)
            {
                throw new BadRequestException("Post id can't be null.");
            }
            ResponsePostDto? post = await _postService.GetPostByIdAsync(currentUserId, postId);
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
                throw new BadRequestException("Comment id is invalid.");
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
        public async Task<int> AddCommentAsync(CreateCommentDto comment, int userId)
        {
            if(comment == null)
            {
                throw new BadRequestException("Comment can't be null.");
            }
            if(string.IsNullOrEmpty(comment.Text))
            {
                throw new BadRequestException("Please, insert a text.");
            }
            if(comment.Text.Length > 255)
            {
                throw new BadRequestException("Comment text can't be bigger than 255 characters.");
            }
            if(comment.UserId <= 0)
            {
                throw new BadRequestException("Invalid user id.");
            }
            if(comment.PostId <= 0)
            {
                throw new BadRequestException("Invalid post id.");
            }
            ResponsePostDto? postDto = await _postService.GetPostByIdAsync(userId, comment.PostId) ?? throw new BadRequestException($"Post {comment.PostId} not found.");

            Comment commentToSave = new Comment
            {
                Text = comment.Text,
                PostId = comment.PostId,
                UserId = userId,
                ParentCommentId = comment.ParentCommentId,
                CreatedAt = DateTimeOffset.UtcNow,
            };
            await _commentRepository.AddCommentAsync(commentToSave);
            return commentToSave.Id;
        }
        public async Task UpdateCommentAsync(CommentDto commentToUpdate, int userId)
        {
            if (commentToUpdate == null)
            {
                throw new BadRequestException("Comment can't be null.");
            }
            if (commentToUpdate.Id <= 0)
            {
                throw new BadRequestException("Comment id can't be null.");
            }
            Comment? comment = await _commentRepository.GetCommentByIdAsync(commentToUpdate.Id) ?? throw new NotFoundException("Comment not found.");
            
            if (comment.UserId != userId)
            {
                throw new UnauthorizedAccessException("You can only edit your own comments.");
            }
            comment.Text = commentToUpdate.Text;
            await _commentRepository.UpdateCommentAsync();
        }
        public async Task DeleteCommentByIdAsync(int commentId, int userId)
        {
            if (commentId <= 0)
            {
                throw new BadRequestException("Comment id is invalid.");
            }
             
            bool deletedIt = await _commentRepository.DeleteCommentByIdAsync(commentId, userId);
            if(!deletedIt)
            {
                throw new NotFoundException("Comment not found or you don't have permission to delete it.");
            }
        }
    }
}
