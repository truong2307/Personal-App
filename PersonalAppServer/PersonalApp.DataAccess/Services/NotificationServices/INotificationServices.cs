using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.NotificationServices
{
    public interface INotificationServices
    {
        Task<ResponseDto> CreateNotification(NotificationCreateDto model);
        Task<ResponseDto> UpdateNotification(NotificationDto model);
        Task<ResponseDto> GetNotifications();
        Task<ResponseDto> DeleteEvent(int idNotification);
    }
}
