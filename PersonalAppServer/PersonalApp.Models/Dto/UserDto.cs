using System.ComponentModel.DataAnnotations;

namespace PersonalApp.Models.Dto
{
    public class UserDto : LoginUserDto
    {
            public string? FullName { get; set; }
            [DataType(DataType.PhoneNumber)]
            public string? PhoneNumber { get; set; }
    }

    public class LoginUserDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [StringLength(15, ErrorMessage = "Your Password is limited to {2} to {1} characters", MinimumLength = 6)]
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
