using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public interface IEventServices
    {
        Task<ResponseDto> CreateEvent(EventDto model);
        Task<ResponseDto> GetEvents();
    }
}
