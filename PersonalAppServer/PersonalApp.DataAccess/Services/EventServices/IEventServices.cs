using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public interface IEventServices
    {
        Task<ResponseDto> CreateEvent(EventDto model);
        Task<ResponseDto> UpdateEvent(EventUpdateDto model);
        Task<ResponseDto> GetEvents();
        Task<ResponseDto> GetEventById(int idEvent);
        Task<ResponseDto> DeleteEvent(int idEvent);
    }
}
