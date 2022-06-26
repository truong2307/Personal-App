using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class NotificationCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string Content { get; set; }
    }

    public class NotificationUpdateDto : NotificationCreateDto
    {
        public int Id { get; set; }
        [Required]
        public bool Seen { get; set; }
    }

    public class NotificationDto : NotificationUpdateDto
    {
        public DateTime? CreatedAt { get; set; }
    }
}
