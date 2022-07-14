using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Entities
{
    public class QuizzTopic : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}
