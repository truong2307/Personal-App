using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.AuthenticationService
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginUserDto userRequest);
        Task<string> CreateToken();
    }
}
