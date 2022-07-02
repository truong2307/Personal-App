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
        public async Task<IActionResult> Post([FromBody] EventCreateDto eventRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _eventServices.CreateEvent(eventRequest);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.ErrorMessages);
        }

        [HttpPut("update-event")]
        public async Task<IActionResult> UpdateEvent([FromBody] EventDto eventRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _eventServices.UpdateEvent(eventRequest);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.ErrorMessages);
        }

        [HttpDelete("delete-event/{idEvent:int}")]
        public async Task<IActionResult> DeleteEvent(int idEvent)
        {
            var result = await _eventServices.DeleteEvent(idEvent);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.ErrorMessages);
        }

        [HttpGet("get-events")]
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
