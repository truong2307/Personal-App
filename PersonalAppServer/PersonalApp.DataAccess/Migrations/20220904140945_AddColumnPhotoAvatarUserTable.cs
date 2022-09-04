using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddColumnPhotoAvatarUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AlbumId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvatarId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "AspNetUsers");
        }
    }
}
