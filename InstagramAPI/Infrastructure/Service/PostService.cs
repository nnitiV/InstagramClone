using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.Services
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
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            Post? post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null) return null;

            return new ResponsePostDto
            {
                Id = post.Id,
                Title = post.Title,
                Caption = post.Caption,
                UserId = post.UserId,
                AuthorName = post.User?.Username ?? "Unknown",
                AuthorProfilePicture = post.User?.ProfilePictureUrl ?? string.Empty,
                LikeCount = post.PostLikes?.Count ?? 0,
                CommentCount = post.Comments?.Count ?? 0,
                IsLiked = post.PostLikes?.Any(pl => pl.UserId == currentUserId) ?? false,
                ContentUrls = post.Contents.Select(c => c.ContentUrl).ToList(),
                CreatedAt = post.CreatedAt
            };
        }

        public async Task<PagedResult<ResponsePostDto>> GetAllUserPostsAsync(int currentUserId, int userId, int page, int pageSize)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 50) pageSize = 50;

            List<Post> posts = await _postRepository.GetAllUserPostsAsync(userId, page, pageSize);
            int totalCount = await _postRepository.GetUserPostCountAsync(userId);

            if (posts.Count <= 0)
            {
                // Returning an empty result is better than null for frontends
                return new PagedResult<ResponsePostDto>
                {
                    Items = new List<ResponsePostDto>(),
                    TotalCount = totalCount,
                    PageNumber = page,
                    PageSize = pageSize
                };
            }

            List<ResponsePostDto> postDtos = posts.Select(post => new ResponsePostDto
            {
                Id = post.Id,
                Title = post.Title,
                Caption = post.Caption,
                AuthorName = post.User?.Username ?? "Unknown",
                AuthorProfilePicture = post.User?.ProfilePictureUrl ?? string.Empty,
                LikeCount = post.PostLikes?.Count ?? 0,
                CommentCount = post.Comments?.Count ?? 0,
                IsLiked = post.PostLikes?.Any(pl => pl.UserId == currentUserId) ?? false,
                ContentUrls = post.Contents.Select(c => c.ContentUrl).ToList(),
                UserId = post.UserId,
                CreatedAt = post.CreatedAt
            }).ToList();

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
                AuthorName = p.User.Username,
                AuthorProfilePicture = p.User.ProfilePictureUrl,
                ContentUrls = p.Contents.Select(c => c.ContentUrl).ToList(),
                LikeCount = p.PostLikes.Count,
                CommentCount = p.Comments.Count,
                IsLiked = p.PostLikes.Any(pl => pl.UserId == currentUserId)
            }).ToList();
        }

        public async Task<int> GetUserPostCountAsync(int userId)
        {
            return await _postRepository.GetUserPostCountAsync(userId);
        }

        public async Task<CreatedPostDto> AddPostAsync(CreatePostDto createPostDto, int userId)
        {
            if (createPostDto == null) throw new BadRequestException("Post can't be empty.");

            ResponseUserDto responseUserDto = await _userService.GetById(userId);
            if (responseUserDto == null) throw new NotFoundException($"Couldn't find user by id {userId}");

            // Keeping your manual user update logic per your request
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
                CreatedAt = DateTimeOffset.UtcNow, // Changed to UtcNow
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

            if (post.Contents != null && post.Contents.Any())
            {
                postToReturn.ContentUrl = post.Contents.First().ContentUrl;
            }
            return postToReturn;
        }

        public async Task UpdatePostAsync(UpdatePostDto updatePostDto, int userId)
        {
            if (updatePostDto == null) throw new BadRequestException("Post can't be empty.");
            if (updatePostDto.Id <= 0) throw new BadRequestException("Please, provide a valid post id.");

            if (string.IsNullOrWhiteSpace(updatePostDto.Caption))
                throw new BadRequestException("Caption can't be empty.");

            if (updatePostDto.ContentUrls == null || updatePostDto.ContentUrls.Count == 0)
                throw new BadRequestException("Contents can't be empty.");

            Post? post = await _postRepository.GetPostByIdAsync(updatePostDto.Id);

            if (post == null || post.UserId != userId)
                throw new UnauthorizedAccessException("You do not have permission to edit this post or it does not exist.");

            post.Title = updatePostDto.Title;
            post.Caption = updatePostDto.Caption;

            var urlsToRemove = post.Contents
                .Where(dbContent => !updatePostDto.ContentUrls.Contains(dbContent.ContentUrl))
                .ToList();

            foreach (var toRemove in urlsToRemove)
            {
                post.Contents.Remove(toRemove);
            }

            var existingUrls = post.Contents.Select(c => c.ContentUrl).ToList();
            var newUrlsToAdd = updatePostDto.ContentUrls
                .Where(url => !existingUrls.Contains(url))
                .ToList();

            int nextOrderIndex = post.Contents.Any() ? post.Contents.Max(c => c.OrderIndex) + 1 : 0;

            foreach (var newUrl in newUrlsToAdd)
            {
                post.Contents.Add(new PostContent
                {
                    ContentUrl = newUrl,
                    OrderIndex = nextOrderIndex++
                });
            }

            var finalContents = post.Contents.OrderBy(c => c.OrderIndex).ToList();
            for (int i = 0; i < finalContents.Count; i++)
            {
                finalContents[i].OrderIndex = i;
            }

            await _postRepository.UpdatePostAsync();
        }

        public async Task DeletePostByIdAsync(int postId, int userId)
        {
            if (postId <= 0) throw new BadRequestException("Please, provide a valid post id.");

            ResponseUserDto responseUserDto = await _userService.GetById(userId);
            if (responseUserDto == null) throw new NotFoundException($"Couldn't find user by id {userId}");

            bool wasDeleted = await _postRepository.DeletePostByIdAsync(postId, userId);

            if (wasDeleted)
            {
                await _userService.UpdateUserInternally(new UpdateUserDto
                {
                    Id = responseUserDto.Id,
                    FollowersCount = responseUserDto.FollowersCount,
                    FollowingCount = responseUserDto.FollowingCount,
                    PostsCount = responseUserDto.PostsCount - 1,
                });
            }
            else
            {
                throw new NotFoundException("Post not found or you don't have permission to delete it.");
            }
        }
    }
}