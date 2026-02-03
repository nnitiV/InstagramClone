using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Service
{
    public class PostService: IPostService
    {
        private readonly IPostRepository _postRepository;
        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<ResponsePostDto?> GetPostByIdAsync(int postId)
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
                Contents = post.Contents,
                CreatedAt = post.CreatedAt
            };
            return postToReturn;
        }

        public async Task<PagedResult<ResponsePostDto>> GetAllUserPostsAsync(int userId, int page, int pageSize)
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
                Contents = post.Contents,
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
        public async Task<List<ResponsePostDto>> GetUserFeedAsync(int currentUserId, int page, int pageSize)
        {
            var posts = await _postRepository.GetUserFeedAsync(currentUserId, page, pageSize);
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
            if(userId <= 0)
            {
                throw new ArgumentException("Invalid user id. Please, send a valid one.");
            }
            return await _postRepository.GetUserPostCountAsync(userId);
        }
        public async Task<int> AddPostAsync(CreatePostDto createPostDto, int userId)
        {
            if(createPostDto == null)
            {
                throw new ArgumentException("Post can't be empty.");
            }
            if(userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id!");
            }

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

            return post.Id;
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
            if(postId <= 0)
            {
                throw new ArgumentException("Please, provide a valid post id.");
            }
            if (userId <= 0)
            {
                throw new ArgumentException("Please, provide a valid user id.");
            }
            return await _postRepository.DeletePostByIdAsync(postId, userId);
        }
      
    }
}
