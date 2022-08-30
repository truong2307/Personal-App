using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using PersonalApp.DataAccess.Helper.GoogleApi;
using PersonalApp.Models.GooglePhoto;
using System.Text.Json;

namespace PersonalApp.API.Controllersk
{
    [Route("api/test")]
    [ApiController]
    public class TestGraphApiController : ControllerBase
    {
        private readonly IGooglePhotoHelper _serviceTest;

        public TestGraphApiController(IGooglePhotoHelper graphHelper)
        {
            _serviceTest = graphHelper;
        }

        [HttpPost]
        public async Task<IActionResult> test()
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();

            var rs = await _serviceTest.UploadImageAsync(file, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");

            return Ok(rs);
        }

    }
}
