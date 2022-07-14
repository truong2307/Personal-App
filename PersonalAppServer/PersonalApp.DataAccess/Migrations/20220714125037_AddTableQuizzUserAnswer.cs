using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddTableQuizzUserAnswer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizzUserAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MultiplechoiceSelected = table.Column<int>(type: "int", nullable: false),
                    EssayAnswer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuizzId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionMultiplechoiceId = table.Column<int>(type: "int", nullable: false),
                    QuestionEssayId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzUserAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizzUserAnswers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizzUserAnswers_QuizzTests_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "QuizzTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizzUserAnswers_QuizzId",
                table: "QuizzUserAnswers",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzUserAnswers_UserId",
                table: "QuizzUserAnswers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizzUserAnswers");
        }
    }
}
