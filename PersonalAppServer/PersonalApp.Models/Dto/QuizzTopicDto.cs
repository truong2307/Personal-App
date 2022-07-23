using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class QuizzTopicCreateDto
    {
        [Required]
        public string Name { get; set; }
    }

    public class QuizzTopicDto : QuizzTopicCreateDto
    {
        public int Id { get; set; }
    }
}
