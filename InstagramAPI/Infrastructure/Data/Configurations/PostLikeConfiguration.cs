
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class PostLikeConfiguration: IEntityTypeConfiguration<PostLike>
    {
        public void Configure(EntityTypeBuilder<PostLike> builder)
        {
            builder.HasKey(pl => pl.Id);

            builder.HasOne<User>(pl => pl.User).WithMany().HasForeignKey(pl => pl.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<Post>(pl => pl.Post).WithMany(p => p.PostLikes).HasForeignKey(pl => pl.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(pl => new { pl.UserId, pl.PostId }).IsUnique();
        }
    }
}
