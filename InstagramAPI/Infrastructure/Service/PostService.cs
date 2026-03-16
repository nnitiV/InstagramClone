using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Service
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserService _userService;
        public PostService(IPostRepository postRepository, IUserService userService)
        {
            _postRepository = postRepository;
            _userService = userService;
        }

        public async Task<ResponsePostDto?> GetPostByIdAsync(int currentUserId, int postId)
        {
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            Post? post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null)
            {
                return null;
            }
            ResponsePostDto postToReturn = new ResponsePostDto
            {
                Id = post.Id,
                Title = post.Title,
                Caption = post.Caption,
                UserId = post.UserId,
                AuthorName = post.User?.Name ?? "Unknown",
                AuthorProfilePicture = post.User?.ProfilePictureUrl ?? string.Empty,
                LikeCount = post.PostLikes?.Count ?? 0,
                CommentCount = post.Comments?.Count ?? 0,
                IsLiked = post.PostLikes?.Any(pl => pl.UserId == currentUserId) ?? false,
                ContentUrls = post.Contents.Select(c => c.ContentUrl).ToList(),
                CreatedAt = post.CreatedAt
            };
            return postToReturn;
        }

        public async Task<PagedResult<ResponsePostDto>> GetAllUserPostsAsync(int currentUserId, int userId, int page, int pageSize)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }

            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 50) pageSize = 50;

            List<Post> posts = await _postRepository.GetAllUserPostsAsync(userId, page, pageSize);
            if (posts.Count <= 0)
            {
                return null;
            }
            List<ResponsePostDto> postDtos = posts.Select(post => new ResponsePostDto
            {
                Id = post.Id,
                Title = post.Title,
                Caption = post.Caption,
                AuthorName = post.User?.Name ?? "Unknown",
                AuthorProfilePicture = post.User?.ProfilePictureUrl ?? string.Empty,
                LikeCount = post.PostLikes?.Count ?? 0,
                CommentCount = post.Comments?.Count ?? 0,
                IsLiked = post.PostLikes?.Any(pl => pl.UserId == currentUserId) ?? false,
                ContentUrls = post.Contents.Select(c => c.ContentUrl).ToList(),
                UserId = post.UserId,
                CreatedAt = post.CreatedAt
            }).ToList();
            int totalCount = await _postRepository.GetUserPostCountAsync(userId);
            return new PagedResult<ResponsePostDto>
            {
                Items = postDtos,
                TotalCount = totalCount,
                PageNumber = page,
                PageSize = pageSize
            };
        }
        public async Task<List<ResponsePostDto>> GetUserFeedAsync(int currentUserId, DateTime? cursor, int pageSize)
        {
            var posts = await _postRepository.GetUserFeedAsync(currentUserId, cursor, pageSize);
            return posts.Select(p => new ResponsePostDto
            {
                Id = p.Id,
                CreatedAt = p.CreatedAt,
                Title = p.Title,
                Caption = p.Caption,
                UserId = p.UserId,
                AuthorName = p.User.Name,
                AuthorProfilePicture = p.User.ProfilePictureUrl,
                ContentUrls = p.Contents.Select(c => c.ContentUrl).ToList(),
                LikeCount = p.PostLikes.Count,
                CommentCount = p.Comments.Count,
                IsLiked = p.PostLikes.Any(pl => pl.UserId == currentUserId)
            }).ToList();
        }
        public async Task<int> GetUserPostCount(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("Invalid user id. Please, send a valid one.");
            }
            return await _postRepository.GetUserPostCountAsync(userId);
        }
        public async Task<CreatedPostDto> AddPostAsync(CreatePostDto createPostDto, int userId)
        {
            if (createPostDto == null)
            {
                throw new ArgumentException("Post can't be empty.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id!");
            }
            ResponseUserDto responseUserDto = await _userService.GetById(userId);
            if (responseUserDto == null)
            {
                throw new NotFoundException("Couldn't find user by id " + userId);
            }

            responseUserDto.PostsCount += 1;
            await _userService.UpdateUserInternally(new UpdateUserDto
            {
                Id = responseUserDto.Id,
                FollowersCount = responseUserDto.FollowersCount,
                FollowingCount = responseUserDto.FollowingCount,
                PostsCount = responseUserDto.PostsCount,
            });

            Post post = new Post
            {
                Title = createPostDto.Title,
                Caption = createPostDto.Caption,
                Contents = new List<PostContent>(),
                UserId = userId,
                CreatedAt = DateTimeOffset.Now,
            };

            if (createPostDto.ContentUrls != null)
            {
                int index = 0;
                foreach (var url in createPostDto.ContentUrls)
                {
                    post.Contents.Add(new PostContent
                    {
                        ContentUrl = url,
                        OrderIndex = index++
                    });
                }
            }

            await _postRepository.AddPostAsync(post);
            CreatedPostDto postToReturn = new CreatedPostDto
            {
                Id = post.Id,
            };
            if(post.Contents != null)
            {
                postToReturn.ContentUrl = post.Contents.ElementAt(0).ContentUrl;
            }
            return postToReturn;
        }
        public async Task<bool> UpdatePostAsync(UpdatePostDto updatePostDto, int userId)
        {
            if (updatePostDto == null)
            {
                throw new ArgumentException("Post can't be empty.");
            }

            if (updatePostDto.Id <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");

            }
            if (updatePostDto.Title.IsNullOrEmpty())
            {
                throw new ArgumentException("Title can't be empty.");
            }
            if (updatePostDto.ContentUrls.IsNullOrEmpty())
            {
                throw new ArgumentException("Contents can't be empty.");
            }

            Post? post = await _postRepository.GetPostByIdAsync(updatePostDto.Id);
            if (post == null)
            {
                return false;
            }
            if (post == null || post.UserId != userId)
            {
                return false;
            }

            post.Title = updatePostDto.Title;
            post.Caption = updatePostDto.Caption != null ? updatePostDto.Caption : string.Empty;
            var urlsToRemove = post.Contents.Where(dbContent => !updatePostDto.ContentUrls.Contains(dbContent.ContentUrl)).ToList();

            foreach (var toRemove in urlsToRemove)
            {
                post.Contents.Remove(toRemove);
            }

            var remainingContents = post.Contents.OrderBy(c => c.OrderIndex).ToList();
            for (int i = 0; i < remainingContents.Count; i++)
            {
                remainingContents[i].OrderIndex = i;
            }

            return await _postRepository.UpdatePostAsync(post);
        }
        public async Task<bool> DeletePostByIdAsync(int postId, int userId)
        {
            if (postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            ResponseUserDto responseUserDto = await _userService.GetById(userId);
            if (responseUserDto == null)
            {
                throw new NotFoundException("Couldn't find user by id " + userId);
            }
            bool wasDeleted = await _postRepository.DeletePostByIdAsync(postId, userId);
            if (wasDeleted)
            {

                responseUserDto.PostsCount -= 1;
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = responseUserDto.Id,
                    FollowersCount = responseUserDto.FollowersCount,
                    FollowingCount = responseUserDto.FollowingCount,
                    PostsCount = responseUserDto.PostsCount,
                });
            }
            return wasDeleted;
        }

    }
}
