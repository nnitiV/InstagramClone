using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMessageEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoryId",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_StoryId",
                table: "Messages",
                column: "StoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Stories_StoryId",
                table: "Messages",
                column: "StoryId",
                principalTable: "Stories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Stories_StoryId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_StoryId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "StoryId",
                table: "Messages");
        }
    }
}
