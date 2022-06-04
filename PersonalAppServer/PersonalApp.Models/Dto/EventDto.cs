using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class EventDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
