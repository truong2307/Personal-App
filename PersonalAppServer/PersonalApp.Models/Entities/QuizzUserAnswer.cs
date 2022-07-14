using PersonalApp.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzUserAnswer : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        public int MultiplechoiceSelected { get; set; }

        public string? EssayAnswer { get; set; }

        [Required]
        public int QuizzId { get; set; }

        [ForeignKey("QuizzId")]
        public QuizzTest QuizzTest { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApiUser ApiUser { get; set; }

        [Required]
        public int QuestionMultiplechoiceId { get; set; }

        [Required]
        public int QuestionEssayId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? UpdatedBy { get; set; }
    }
}
