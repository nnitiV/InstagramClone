using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class PostConfiguration: IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title).IsRequired().HasMaxLength(50);
            builder.Property(p => p.Caption).HasMaxLength(100);

            builder.HasOne<User>(p => p.User).WithMany().HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }        
    }
}
