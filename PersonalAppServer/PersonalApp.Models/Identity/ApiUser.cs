using Microsoft.AspNetCore.Identity;

namespace PersonalApp.Models.Identity
{
    public class ApiUser : IdentityUser
    {
        public string FullName { get; set; }

        public string AvatarUrl { get; set; }

        public string AvatarId { get; set; }

        public string AlbumId { get; set; }
    }
}
