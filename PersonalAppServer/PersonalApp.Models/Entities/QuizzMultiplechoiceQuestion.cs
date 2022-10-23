using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzMultipleChoiceQuestion : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        public string QuestionText { get; set; }

        public string QuestionImage { get; set; }

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

        [ForeignKey("QuizzId")]
        public QuizzTest QuizzTest { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? UpdatedBy { get; set; }
    }
}
