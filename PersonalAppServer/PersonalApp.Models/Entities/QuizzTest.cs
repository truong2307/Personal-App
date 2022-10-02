using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class QuizzTest : BaseEntity, IInfoCreateUpdate
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; }

        [Required]
        public int ExamTime { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int TopicId { get; set; }

        [ForeignKey("TopicId")]
        public virtual QuizzTopic QuizzTopic { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public string ImageId { get; set; }

        [ForeignKey("ImageId")]
        public GoogleImage GoogleImage { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string UpdatedBy { get; set; }

        public virtual ICollection<QuizzMultiplechoiceQuestion> MultiplechoiceQuestions { get; set; }

        public virtual ICollection<QuizzEssayQuestion> EssayQuestions { get; set; }
    }
}
