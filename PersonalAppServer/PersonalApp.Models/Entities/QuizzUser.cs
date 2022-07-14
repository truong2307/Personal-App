using PersonalApp.Models.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzUser : BaseEntity
    {
        [Required]
        public int QuizzId { get; set; }

        [ForeignKey("QuizzId")]
        public virtual QuizzTest QuizzTest { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApiUser ApiUser { get; set; }

    }
}
