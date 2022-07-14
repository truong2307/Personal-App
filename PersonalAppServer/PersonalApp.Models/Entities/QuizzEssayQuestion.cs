using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzEssayQuestion : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        public string QuestionText { get; set; }

        public string? QuestionImage { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }

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
