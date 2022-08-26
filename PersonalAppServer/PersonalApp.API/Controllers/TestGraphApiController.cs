using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Helper.OneDriveHandler;
using PersonalApp.DataAccess.Utility.BaseURI;

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

        [HttpPost]
        public async Task<IActionResult> test()
        {
            //read file form request body
            await _serviceTest.UploadFileToDrive("EwBgA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAS/r5XCNyK8x0UeuO2Y5O4HWND82HPEugujkV8nj5sA3uH5iXq+mm2hITbX+S8NVmdPOSeNho7+7awcrQZIw4KklfSP90c5Afs0J2h5n3Me9EMtpMMzuJiQsLmTq4QjwT1UgK5kZdg6bpdteGrPm2b9BVkjs78WuUnROfcCi8tZ/wP7K+cfVWt/pOg0/UWlCrgZYK8UeB01G33tcwq8nZFvoeH0FFlygTxUyjBdwk7UWsUMKgjaRu/9warDVpHKpQAz0z9bcpOA/cYKH+Ax1cqadA36OnsJimzlDqoRfOJOkhvT5LzG3N6Jb8kuYxpskuDsJh7eLPyXyuMUSvkJJ+gkDZgAACGC/BYFuJrT4MAKZvEUv0OG1bY+V8oLV6ncmwqe2FwzyB0fz9OoSfVx/YYtJMHH6e6fNlBfUXW/xuBWoTqlaxMXnowOvWr9X0x2RgqMwwqMFsdtDL0H8nGmfjpGT1X2tcKmImngGbpkP5hQnSfwW1KUXI2M/DkD9LoyzRO5iE103WlNcCdsmJ3judyzSi3V/VFNrTcD4E0De0ybB/IjCAV5ElFYg/9la5MRAHfMgFz0UIMuUzY9q60L6cWoGEdZNOKxT5HIRJ3H84TITGPTeHZeHsn7zMPJrXHFMhVvD4RaJwmeuXG8lSc2UUHg//lNeT6qvVP6m9uyrN3tNUsRuilEmTk7iyLga9nWXm1yQK0x2IQnMUQMqAlamxgsHGgymT1RdYSPsTUkuH5zUU0YZi92qvcULuFzAMSLfZWhiWW31K6oaX4IHWT0DkVuZD5s/h4E9hK+jKKr6D5sMdLVeY2P+eRO8rX4CuSL/pE5s1NW7QDpyyukKa2wEapHpMRqPiXnThGWqOBcIk6wYkXYPjE3yUyvZwi0ldNH8fCqd8eWOE4EP6Qv1mwLyfVNmNBqURnBErvag7i8ivysdbAli/7frDuh0bGQxf+gme1NopaomllIh3vVwHGWEuYYJlcoLdrGjAOViL3sMetkfjP6EM/BZ8mLHYa1Kzz9/ObK63moVwlp2bBXAxe4HNC9xmtHd+pV+jzZgCq72L1p0gudDFV9jdilt2/XXkpfAgUsvCXUqi/WaEVe/kVUvn3EC");

            return Ok();
        }

    }
}
