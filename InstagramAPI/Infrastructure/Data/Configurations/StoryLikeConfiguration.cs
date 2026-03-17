
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class StoryLikeConfiguration: IEntityTypeConfiguration<StoryLike>
    {
        public void Configure(EntityTypeBuilder<StoryLike> builder)
        {
            builder.HasKey(pl => pl.Id);

            builder.HasOne<User>(pl => pl.User).WithMany().HasForeignKey(pl => pl.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<Story>(pl => pl.Story).WithMany().HasForeignKey(pl => pl.StoryId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(pl => new { pl.UserId, pl.StoryId }).IsUnique();
        }
    }
}
