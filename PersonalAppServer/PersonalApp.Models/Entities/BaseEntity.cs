using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Entities
{
    public class BaseEntity 
    {
        [Key]
        public int Id { get; set; }
    }

}
