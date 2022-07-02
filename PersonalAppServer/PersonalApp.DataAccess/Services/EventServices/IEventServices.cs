using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public interface IEventServices
    {
        Task<ResponseDto> CreateEvent(EventCreateDto model);
        Task<ResponseDto> UpdateEvent(EventDto model);
        Task<ResponseDto> GetEvents();
        Task<ResponseDto> DeleteEvent(int idEvent);
    }
}
