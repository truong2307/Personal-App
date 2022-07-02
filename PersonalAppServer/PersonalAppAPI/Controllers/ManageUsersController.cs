using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Services.ManageUserServices;

namespace PersonalAppAPI.Controllers
{
    [Route("api/manage-user")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ManageUsersController : ControllerBase
    {
        private readonly IManageUserServices _manageUserServices;
        public ManageUsersController(IManageUserServices manageUserServices)
        {
            _manageUserServices = manageUserServices;
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> GetEvents()
        {
            var result = await _manageUserServices.GetAllUser();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
