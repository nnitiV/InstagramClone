using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class FollowerConfiguration: IEntityTypeConfiguration<Follower>
    {
        public void Configure(EntityTypeBuilder<Follower> builder)
        {
            builder.HasKey(f => f.Id);
            builder.HasOne<User>(f => f.UserFollowed).WithMany().HasForeignKey(f => f.UserIdFollowed)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<User>(f => f.UserFollowing).WithMany().HasForeignKey(f => f.UserIdFollowing)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(f => new {f.UserIdFollowing, f.UserIdFollowed}).IsUnique();
        }
    }
}
