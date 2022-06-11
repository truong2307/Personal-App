using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Services.EventServices;
using PersonalApp.Models.Dto;

namespace PersonalAppAPI.Controllers
{
    [Route("api/events")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class EventController : ControllerBase
    {
        private readonly IEventServices _eventServices;
        public EventController(IEventServices eventServices)
        {
            _eventServices = eventServices;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventDto eventRequest)
        {
            var result = await _eventServices.CreateEvent(eventRequest);
            return Ok(result);
        }

        [Route("get-events")]
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var result = await _eventServices.GetEvents();
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.ErrorMessages);
        }
    }
}
