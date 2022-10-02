using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AlterTableQuizzTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "QuizzTests");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "QuizzTests");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "QuizzTests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuizzTests_ImageId",
                table: "QuizzTests",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzTests_GoogleImages_ImageId",
                table: "QuizzTests",
                column: "ImageId",
                principalTable: "GoogleImages",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizzTests_GoogleImages_ImageId",
                table: "QuizzTests");

            migrationBuilder.DropIndex(
                name: "IX_QuizzTests_ImageId",
                table: "QuizzTests");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AlbumId",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "QuizzTests",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
