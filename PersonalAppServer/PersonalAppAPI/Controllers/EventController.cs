using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalAppAPI.Controllers
{
    [Route("api/events")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class EventController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public EventController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] EventDto eventRequest)
        {
            var eventToDb = _mapper.Map<Event>(eventRequest);

            await _unitOfWork.Events.Add(eventToDb);
            var result = await _unitOfWork.SaveChangeAsync();
            return Ok(result);
        }
    }
}
