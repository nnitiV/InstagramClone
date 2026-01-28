using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class PostContentConfiguration: IEntityTypeConfiguration<PostContent>
    {
        public void Configure(EntityTypeBuilder<PostContent> builder)
        {
            builder.HasKey(pc => pc.Id);

            builder.Property(pc => pc.ContentUrl).IsRequired();

            builder.HasOne<Post>(pc => pc.Post).WithMany(p => p.Contents).HasForeignKey(pc => pc.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
