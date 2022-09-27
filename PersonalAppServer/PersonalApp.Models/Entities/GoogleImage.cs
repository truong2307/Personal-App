using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class GoogleImage
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string ImageName { get; set; }

        [Required]
        public string BaseUrl { get; set; }

        [Required]
        public string AlbumId { get; set; }

        [ForeignKey("AlbumId")]
        public virtual GoogleAlbumImage AlbumImage { get; set; }

        [Required]
        public DateTime Expires { get; set; }
    }
}
