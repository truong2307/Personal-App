using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class QuizzEssayQuestionCreateDto
    {
        [Required]
        public string QuestionText { get; set; }

        public string QuestionImage { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }

        [Required]
        public decimal Mark { get; set; }
    }

    public class QuizzEssayQuestionUpdateDto : QuizzEssayQuestionCreateDto
    {
        public int Id { get; set; }

        [Required]
        public int QuizzId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }
    }

    public class QuizzEssayQuestionDto : QuizzEssayQuestionCreateDto
    {
        public int Id { get; set; }

        [Required]
        public int QuizzId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }
    }
}
