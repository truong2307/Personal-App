using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class EventCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        public string Color { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }

    public class EventDto : EventCreateDto
    {
        public int Id { get; set; }
    }
}
