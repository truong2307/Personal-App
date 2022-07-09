using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Services.ManageUserServices;
using PersonalApp.DataAccess.Services.MasterDataServices;
using PersonalApp.Models.Dto;

namespace PersonalAppAPI.Controllers
{
    [Route("api/manage-user")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ManageUsersController : ControllerBase
    {
        private readonly IManageUserServices _manageUserServices;
        public ManageUsersController(
            IManageUserServices manageUserServices
            )
        {
            _manageUserServices = manageUserServices;
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _manageUserServices.GetAllUser();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto model)
        {
            var result = await _manageUserServices.UpdateUser(model);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
