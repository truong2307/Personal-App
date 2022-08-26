using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Helper.OneDriveHandler;

namespace PersonalApp.API.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestGraphApiController : ControllerBase
    {
        private readonly IGraphHelper _serviceTest;

        public TestGraphApiController(IGraphHelper graphHelper)
        {
            _serviceTest = graphHelper;
        }

        [HttpGet]
        public async Task<IActionResult> test()
        {
            var a = await _serviceTest.ResfreshAccessToken();
            return Ok(a);
        }

    }
}
