using Microsoft.AspNetCore.Http;
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

        public string ImageUrl { get; set; }

        [Required]
        public int TopicId { get; set; }

        public QuizzTopic QuizzTopic { get; set; }

        [Required]
        public bool IsPublic { get; set; }
    }

    public class QuizzDetailDto : QuizzDto
    {
        public List<QuizzMultiplechoiceQuestionDto> MultipleChoiceQuestions { get; set; }

        public List<QuizzEssayQuestionDto> EssayQuestions { get; set; }
    }

    public class QuizzUpdateDto 
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; }

        [Required]
        public int ExamTime { get; set; }

        public IFormFile ImageQuizz { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int TopicId { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public List<QuizzMultiplechoiceQuestionUpdateDto> MultipleChoiceQuestions { get; set; }

        public List<QuizzEssayQuestionUpdateDto> EssayQuestions { get; set; }
    }

    public class QuizzCreateDto
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; }

        [Required]
        public int ExamTime { get; set; }

        public IFormFile ImageQuizz { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int TopicId { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public List<QuizzMultiplechoiceQuestionCreateDto> MultipleChoiceQuestions { get; set; }

        public List<QuizzEssayQuestionCreateDto> EssayQuestions { get; set; }
    }
}
