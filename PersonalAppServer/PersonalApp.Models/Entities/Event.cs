using PersonalApp.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class Event : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApiUser ApiUser { get; set; }
        [Required]
        public string Color { get; set; }
    }
}
