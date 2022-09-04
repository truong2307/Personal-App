using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddColumnPhotoForQuizzTestTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AlbumId",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "QuizzTests");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "QuizzTests");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "QuizzTests");
        }
    }
}
