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

        private readonly IHttpClientFactory _httpClient;

        public TestGraphApiController(IGooglePhotoHelper graphHelper
            , IHttpClientFactory httpClient
            , ILogger<TestGraphApiController> logger)
        {
            _serviceTest = graphHelper;
            _logger = logger;
            _httpClient = httpClient;
        }

#if DEBUG
        [HttpPost]
        public async Task<IActionResult> test()
        {
            var formCollection = await Request?.ReadFormAsync();
            var file = formCollection.Files.First();
            //var rs = await _serviceTest.UploadImageAsync(file, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");

            var image = await _serviceTest.GetImageByIdAsync("AOr7KUOSCXNfbMF-y5X3RdiwlhsinlcyuUurYW6J_gARnOoPHsoiz1BO8lw1tFIZ81Suw0mfvEmy4uP5zVckw1LTpMyNsLygeQ");


            return Ok(image);
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
