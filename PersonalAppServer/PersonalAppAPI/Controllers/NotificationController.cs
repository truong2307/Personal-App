using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccess.Services.NotificationServices;
using PersonalApp.Models.Dto;

namespace PersonalAppAPI.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationServices _notificationServices;
        public NotificationController(INotificationServices notificationServices)
        {
            _notificationServices = notificationServices;
        }

        /// <summary>
        /// test
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NotificationCreateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _notificationServices.CreateNotification(model);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpPut("update-notification")]
        public async Task<IActionResult> UpdateNotification([FromBody] NotificationUpdateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.Values.ToString());
            var result = await _notificationServices.UpdateNotification(model);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpDelete("delete-notification/{id:int}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var result = await _notificationServices.DeleteNotification(id);
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }

        [HttpGet("get-notifications")]
        public async Task<IActionResult> GetEvents()
        {
            var result = await _notificationServices.GetNotifications();
            return result.IsSuccess ? Ok(result) : BadRequest(result.ErrorMessages);
        }
    }
}
