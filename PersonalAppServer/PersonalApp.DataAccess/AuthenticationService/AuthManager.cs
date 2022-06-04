using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PersonalApp.DataAccess.Utility.BaseURI;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PersonalApp.DataAccess.AuthenticationService
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IConfiguration _configuration;
        private ApiUser _user;

        public AuthManager(UserManager<ApiUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> CreateToken()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var token = GenerateTokenOptions(claims, signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken GenerateTokenOptions(List<Claim> claims, SigningCredentials signingCredentials)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var expiration = DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("lifetime").Value));


            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("Issuer").Value,
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
                );

            return token;
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypeUser.TYPE_NAME, _user.UserName),
                new Claim(ClaimTypeUser.TYPE_USERID, _user.Id),
            };

            var roles = await _userManager.GetRolesAsync(_user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypeUser.TYPE_ROLE, role));
            }

            return claims;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = _configuration.GetSection("Secret").GetSection("Key").Value;
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha512Signature);

            return signingCredentials;
        }

        public async Task<bool> ValidateUser(LoginUserDto userRequest)
        {
            _user = await _userManager.FindByEmailAsync(userRequest.Email);
            bool checkUserSuccess = await _userManager.CheckPasswordAsync(_user, userRequest.Password);

            if (_user != null && checkUserSuccess)
            {
                return true;
            }
            return false;
        }
    }
}
