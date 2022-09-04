using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Entities
{
    public interface IInfoCreateUpdate
    {
        public DateTime CreatedAt { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string UpdatedBy { get; set; }
    }
}
