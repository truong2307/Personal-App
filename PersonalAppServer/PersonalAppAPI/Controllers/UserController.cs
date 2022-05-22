using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.AuthenticationService;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Identity;

namespace PersonalAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        private readonly IMapper _mapper;
        private readonly UserManager<ApiUser> _userManager;

        public UserController(IMapper mapper, UserManager<ApiUser> userManager, IAuthManager authManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _authManager = authManager;
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> Register([FromBody] UserDto userRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userToDb = _mapper.Map<ApiUser>(userRequest);
                userToDb.UserName = userRequest.Email;
                var userResponse = await _userManager.CreateAsync(userToDb, userRequest.Password);

                if (!userResponse.Succeeded)
                {
                    foreach (var error in userResponse.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return BadRequest(ModelState);
                }

                return Accepted();

            }
            catch (Exception ex)
            {
                return Problem($"Somethong went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> Login(LoginUserDto userRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                bool loginUserSucceeded = await _authManager.ValidateUser(userRequest);
                if (!loginUserSucceeded)
                {
                    return BadRequest("Sai mật khẩu");
                }

                return Accepted(new { token = await _authManager.CreateToken() });
            }
            catch (Exception ex)
            {
                return Problem($"Somethong went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }
    }
}
