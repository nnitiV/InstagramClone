using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class StoryConfiguration : IEntityTypeConfiguration<Story>
    {
        public void Configure(EntityTypeBuilder<Story> builder) {
            builder.HasKey(s => s.Id);

            builder.HasOne(s => s.User)
                  .WithMany() 
                  .HasForeignKey(s => s.UserId)
                  .OnDelete(DeleteBehavior.Cascade); 

            builder.Property(s => s.MediaUrl).IsRequired();
        }
    }
}
