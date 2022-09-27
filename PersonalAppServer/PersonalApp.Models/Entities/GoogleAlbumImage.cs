using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class GoogleAlbumImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int AmountImage { get; set; }

        [Required]
        public string LiveUrl { get; set; }

    }
}
