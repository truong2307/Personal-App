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

        [HttpPost]
        public async Task<IActionResult> test()
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();

            var rs = await _serviceTest.UploadImageAsync(file, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");
            //await _serviceTest.RemoveImage("AOr7KUMYCFeMvvnK6USs2TcQnbux9Xc7rVYnw2gdCZe0cE33jSkbaVuXkzE0S3zz3Yu707LDf2-dmCusDodAwRkT4wtrr1ybOA", "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");

            return Ok(rs);
        }

        [HttpGet("login-for-google-photo/{code}")]
        public async Task<IActionResult> LoginForGooglePhoto(string code)
        {
            _logger.LogInformation("Listening login-google...");
            return Ok(await _serviceTest.LoginAsync(code));
        }
    }
}
