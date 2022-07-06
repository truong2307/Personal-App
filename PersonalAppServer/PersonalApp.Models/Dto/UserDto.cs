using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class UserDto
    {
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserDto
    {
        [Required]
        public string EmailOrUserName { get; set; }
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
