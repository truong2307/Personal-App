using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.NotificationServices
{
    public interface INotificationServices
    {
        Task<ResponseDto> CreateNotification(NotificationCreateDto model);
        Task<ResponseDto> UpdateNotification(NotificationUpdateDto model);
        Task<ResponseDatas<NotificationDto>> GetNotifications();
        Task<ResponseDto> DeleteNotification(int idNotification);
    }
}
