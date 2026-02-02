using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class CommentConfiguration: IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Text).IsRequired().HasMaxLength(255);

            builder.HasOne<Post>(c => c.Post).WithMany(p => p.Comments).HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<User>(c => c.User).WithMany().HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<Comment>(c => c.ParentComment).WithMany(c => c.Replies).HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
