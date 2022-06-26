using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.NotificationServices
{
    public class NotificationServices : INotificationServices
    {
        public Task<ResponseDto> CreateNotification(NotificationCreateDto model)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseDto> DeleteEvent(int idNotification)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseDto> GetNotifications()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseDto> UpdateNotification(NotificationDto model)
        {
            throw new NotImplementedException();
        }
    }
}
