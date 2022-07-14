using PersonalApp.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzUserMark : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        public decimal Mark { get; set; }

        [Required]
        public DateTime CompletedDate { get; set; }

        [Required]
        public bool IsLockPoint { get; set; }

        [Required]
        public int QuizzId { get; set; }

        [ForeignKey("QuizzId")]
        public virtual QuizzTest QuizzTest { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApiUser ApiUser { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? UpdatedBy { get; set; }
    }
}
