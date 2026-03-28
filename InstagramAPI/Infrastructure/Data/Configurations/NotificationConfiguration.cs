using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations
{
    public class NotificationConfiguration: IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.HasKey(n => n.Id);

            builder.Property(n => n.Type).HasMaxLength(50).IsRequired();

            builder.HasOne(n => n.User).WithMany().HasForeignKey(n => n.UserId).OnDelete(DeleteBehavior.Cascade); 

            builder.HasOne(n => n.TriggerBy).WithMany().HasForeignKey(n => n.TriggerById).OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(n => n.Post).WithMany().HasForeignKey(n => n.PostId).OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(n => n.Story).WithMany().HasForeignKey(n => n.StoryId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
