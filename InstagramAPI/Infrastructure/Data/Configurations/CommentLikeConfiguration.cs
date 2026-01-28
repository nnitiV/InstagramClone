
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class CommentLikeConfiguration: IEntityTypeConfiguration<CommentLike>
    {
        public void Configure(EntityTypeBuilder<CommentLike> builder) {
            builder.HasKey(cl => cl.Id);
            builder.HasOne<User>(cl => cl.User).WithMany().HasForeignKey(cl => cl.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<Comment>(cl => cl.Comment).WithMany().HasForeignKey(cl => cl.CommentId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(cl => new { cl.UserId, cl.CommentId }).IsUnique();
        }
    }
}
