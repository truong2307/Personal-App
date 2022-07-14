using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalApp.DataAccess.Migrations
{
    public partial class AddTableQuizzTestQuizzMultiChoiceQuizzEssay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizzTests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ExamTime = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    TopicId = table.Column<int>(type: "int", nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizzTests_QuizzTopics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "QuizzTopics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizzEssayQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CorrectAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mark = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuizzId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzEssayQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizzEssayQuestions_QuizzTests_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "QuizzTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizzMultiplechoiceQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AnswerA = table.Column<int>(type: "int", nullable: false),
                    AnswerB = table.Column<int>(type: "int", nullable: false),
                    AnswerC = table.Column<int>(type: "int", nullable: false),
                    AnswerD = table.Column<int>(type: "int", nullable: false),
                    CorrectAnswer = table.Column<int>(type: "int", nullable: false),
                    Mark = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuizzId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzMultiplechoiceQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizzMultiplechoiceQuestions_QuizzTests_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "QuizzTests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizzEssayQuestions_QuizzId",
                table: "QuizzEssayQuestions",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzMultiplechoiceQuestions_QuizzId",
                table: "QuizzMultiplechoiceQuestions",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzTests_TopicId",
                table: "QuizzTests",
                column: "TopicId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizzEssayQuestions");

            migrationBuilder.DropTable(
                name: "QuizzMultiplechoiceQuestions");

            migrationBuilder.DropTable(
                name: "QuizzTests");
        }
    }
}
