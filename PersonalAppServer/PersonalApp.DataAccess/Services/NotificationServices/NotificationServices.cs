using AutoMapper;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.NotificationServices
{
    public class NotificationServices : INotificationServices
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClaimUserServices _claimUserServices;
        private readonly ResponseDto _responseDto;
        public NotificationServices(
            IMapper mapper
            , IUnitOfWork unitOfWork
            , IClaimUserServices claimUserServices
            )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork; 
            _claimUserServices = claimUserServices;
            _responseDto = new ResponseDto();
        }
        public async Task<ResponseDto> CreateNotification(NotificationCreateDto model)
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                var notificationToDb = _mapper.Map<Notification>(model);
                notificationToDb.Seen = false;
                notificationToDb.UpdatedBy = currentUserId;
                notificationToDb.CreatedBy = currentUserId;
                notificationToDb.CreatedAt = DateTime.Now;
                notificationToDb.UserId = currentUserId;

                await _unitOfWork.Notifications.Add(notificationToDb);
                await _unitOfWork.SaveChangeAsync();

                _responseDto.Result = model;
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDto> DeleteNotification(int idNotification)
        {
            try
            {
                var notification = await _unitOfWork.Notifications.Get(c => c.Id == idNotification);
                if(notification == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Notification not exist in system";
                    return _responseDto;
                }

                await _unitOfWork.Notifications.Delete(idNotification);
                await _unitOfWork.SaveChangeAsync();
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDatas<NotificationDto>> GetNotifications()
        {
            var response = new ResponseDatas<NotificationDto>();
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                var notificationsByUserId = (await _unitOfWork.Notifications
                    .GetAll(c => c.UserId == currentUserId)).OrderBy(c => c.CreatedAt);
                response.Datas = _mapper.Map<List<NotificationDto>>(notificationsByUserId);

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            return response;
        }

        public async Task<ResponseDto> UpdateNotification(NotificationUpdateDto model)
        {
            try
            {
                var notification = await _unitOfWork.Notifications.Get(c => c.Id == model.Id);
                if (notification == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Notification not exist in system";
                    return _responseDto;
                }

                var currentUserId = _claimUserServices.GetCurrentUserId();
                notification.Seen = true;
                notification.UpdatedBy = currentUserId;
                notification.UpdatedAt = DateTime.Now;

                await _unitOfWork.Notifications.Update(notification);
                await _unitOfWork.SaveChangeAsync();

                _responseDto.Result = model;
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }
    }
}
