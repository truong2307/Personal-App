using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Services.MasterDataServices;

namespace PersonalAppAPI.Controllers
{
    [Route("api/master-data")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class MasterController : Controller
    {
        private readonly IMasterDataServices _masterDataServices;

        public MasterController(IMasterDataServices masterDataServices)
        {
            _masterDataServices = masterDataServices;   
        }

        [HttpGet("get-roles")]
        public async Task<IActionResult> GetEvents()
        {
            var result = await _masterDataServices.GetRoles();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
