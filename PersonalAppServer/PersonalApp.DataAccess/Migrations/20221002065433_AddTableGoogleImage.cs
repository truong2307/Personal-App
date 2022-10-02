using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddTableGoogleImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoogleImages",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BaseUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AlbumId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoogleImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoogleImages_GoogleAlbumImages_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "GoogleAlbumImages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoogleImages_AlbumId",
                table: "GoogleImages",
                column: "AlbumId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoogleImages");
        }
    }
}
