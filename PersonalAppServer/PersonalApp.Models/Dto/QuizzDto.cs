using PersonalApp.Models.Entities;
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

        public QuizzTopic QuizzTopic { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public List<QuizzMultiplechoiceQuestionDto> MultiplechoiceQuestions { get; set; }

        public List<QuizzEssayQuestionDto> EssayQuestions { get; set; }
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

        [Required]
        public bool IsPublic { get; set; }

        public List<QuizzMultiplechoiceQuestionCreateDto> MultiplechoiceQuestions { get; set; }

        public List<QuizzEssayQuestionCreateDto> EssayQuestions { get; set; }
    }
}
