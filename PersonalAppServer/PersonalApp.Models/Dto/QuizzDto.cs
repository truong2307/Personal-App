using PersonalApp.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class QuizzDto
    {
        public int Id { get; set; }

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

        public List<QuizzMultiplechoiceQuestionDto> MultiplechoiceQuestion { get; set; }

        public List<QuizzEssayQuestionDto> EssayQuestion { get; set; }
    }

    public class QuizzCreateDto
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

        public List<QuizzMultiplechoiceQuestionCreateDto> QuestionCreate { get; set; }

        public List<QuizzEssayQuestionCreateDto> EssayQuestion { get; set; }
    }
}
