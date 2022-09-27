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
            var a = _httpClient.CreateClient();
            var rs2 = await a.GetAsync("https://lh3.googleusercontent.com/lr/AGiIYOXjsthG_A6YzgoGhNu5j5e3tXI8DPyPKO1Hodia7A7bsxfrMCr4DSUEz3pD3CUvjshNP0AQ3LxxabK15E049YDQN8jLzh6-1qaZtdNN_DWJNEvry7peZJH6ZNbsuilUN0zobAcUDYB5crv9KbG7CPg91hbM6blRTmciYs_ddrabPIyrt5XWxhGG3PT9isGC0o_Xk9Ei3R23s4kMF8jIIcTe5lRoP2bGJhA1fmA8wq6EOqyfWj5OeyBKRUIXhS_vtJMYpqsgMAhOFSMHpzdCWhp1EgK_dhhLLxUR725oQkCf_O6zriseL5-5vTGJpsASScFVbwFlUBAiz548nNMQvEi-BW2QOm50FfCt_dnGC56uODgffIPzXBO2JHIz-UWwlPMk0tfZGLzudJ3kmiu-Jx1EIB7bqzIw08Xwte326R_Fhol2d4IR23TUvnxSHx0nDQNnC4BA1kiO0EwpxL-f16234a4hGgHG9WSK8fvZQRBzaIxWFKgC2D8PBDSu4mNgVkz-FYu9m9SMwatKGy_wy-QRhVD_6qfSzzDnSSJFaGwt25mSLNt9JOY0mVVRhtHVCjdpoxyvs45G3Bng_69neLkzgqugOWZYkNf21BV6iipUVPn4uDf1bQ2Sxafh1PeaG9m1dpWctc10qKfAhNWRbfyQ9C7Uip18W5mwK6m4nkjf43cU-Rssyj54gDCJvKpVb6PXmqv-_WACqhkcmrjh8c-Gb9K68JllbusTppWrwtmELNRT_76StPlt1gwIAlgh_j6W4z-vqSoTtkfBe3w_zyRqm2bo7E4L_cAODOKYgnoCDxxEreqFrvQ7Pfz-fCLFSb4IihFw2NtUUwZjUVS0dPLGp0kIhsDpkn2CW4EE5nu4X2bu2gULJwaalQVl5oZI30ly7p6OhKNOVVZ7syuAJzh7Z-pOTW9jaAdShERZmfmqZpavoG47EdFTtA3k1qQ1vBddKLnjS4NLUiwFcihx4jrap8cy77CtXYLt9AAiOQswqqieKpKVTQ3pKaXxYg_ChA");

            var formCollection = await Request?.ReadFormAsync();
            var file = formCollection.Files.First();
            var rs = await _serviceTest.UploadImageAsync(file, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");
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
