using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalApp.Models.Entities
{
    public class GooglePhotoAlbum
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string AlbumId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int TypeAlbum { get; set; }

        [Required]
        public string LinkAlbum { get; set; }
    }
}
