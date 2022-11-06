using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class GoogleAlbumImage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string AlbumId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int AmountImage { get; set; }

        [Required]
        public string LiveUrl { get; set; }

    }
}
