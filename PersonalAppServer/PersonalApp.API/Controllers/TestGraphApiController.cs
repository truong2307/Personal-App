using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Helper.GoogleApi;

namespace PersonalApp.API.Controllersk
{
    [Route("api/test")]
    [ApiController]
    public class TestGraphApiController : ControllerBase
    {
        private readonly IGooglePhotoHelper _serviceTest;

        private readonly ILogger<TestGraphApiController> _logger;

        public TestGraphApiController(IGooglePhotoHelper graphHelper
            , ILogger<TestGraphApiController> logger)
        {
            _serviceTest = graphHelper;
            _logger = logger;
        }

#if DEBUG
        [HttpPost]
        public async Task<IActionResult> test()
        {
            var formCollection = await Request?.ReadFormAsync();
            var file = formCollection.Files.First();
            //var rs = await _serviceTest.UploadImageAsync(file, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");
            return Ok();
        }

        [HttpPost("login-for-google-photo")]
        public async Task<IActionResult> LoginForGooglePhoto([FromBody] string code)
        {
            _logger.LogInformation("Listening login-google...");
            return Ok(await _serviceTest.LoginAsync(code));
        }
#endif
    }
}
