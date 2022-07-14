using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class QuizzMultiplechoiceQuestionCreateDto
    {
        [Required]
        public string QuestionText { get; set; }

        public string? QuestionImage { get; set; }

        [Required]
        public string AnswerA { get; set; }

        [Required]
        public string AnswerB { get; set; }

        [Required]
        public string AnswerC { get; set; }

        [Required]
        public string AnswerD { get; set; }

        [Required]
        public int CorrectAnswer { get; set; }

        [Required]
        public decimal Mark { get; set; }

        [Required]
        public int QuizzId { get; set; }
    }

    public class QuizzMultiplechoiceQuestionDto : QuizzMultiplechoiceQuestionCreateDto
    {
        public int Id { get; set; }
    }
}
