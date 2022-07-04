using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class UserDto : LoginUserDto
    {
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
    }

    public class LoginUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserForAdminManagerDto
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
    }
}
