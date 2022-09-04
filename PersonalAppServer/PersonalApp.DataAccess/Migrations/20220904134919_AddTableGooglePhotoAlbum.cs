using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddTableGooglePhotoAlbum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GooglePhotoAlbums",
                columns: table => new
                {
                    AlbumId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeAlbum = table.Column<int>(type: "int", nullable: false),
                    LinkAlbum = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GooglePhotoAlbums", x => x.AlbumId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GooglePhotoAlbums");
        }
    }
}
