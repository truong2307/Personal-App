using AutoMapper;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.DataAccess.Services.NotificationServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public class EventServices : IEventServices
    {
        private readonly IMapper _mapper;
        private readonly IClaimUserServices _claimUserServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ResponseDto _responseDto;
        private readonly INotificationServices _notificationServices;
        public EventServices(IMapper mapper
            , IClaimUserServices claimUserServices
            , IUnitOfWork unitOfWork
            , INotificationServices notificationServices
            )
        {
            _mapper = mapper;
            _claimUserServices = claimUserServices;
            _unitOfWork = unitOfWork;
            _notificationServices = notificationServices;
            _responseDto = new ResponseDto();
        }
        public async Task<ResponseDto> CreateEvent(EventCreateDto model)
        {
            model.StartDate = model.StartDate.ToLocalTime();
            model.EndDate = model.EndDate.ToLocalTime();
            var currentUserId = _claimUserServices.GetCurrentUserId();
            var eventToDb = _mapper.Map<Event>(model);

            eventToDb.UpdatedBy = currentUserId;
            eventToDb.CreatedBy = currentUserId;
            eventToDb.CreatedAt = DateTime.Now;
            eventToDb.UpdatedAt = DateTime.Now;
            eventToDb.UserId = currentUserId;

            await _unitOfWork.Events.AddAsync(eventToDb);
            await _unitOfWork.SaveChangeAsync();

            var notificationNew = new NotificationCreateDto()
            {
                Content = $"Bạn vừa tạo event {eventToDb.Title} !"
            };

            await _notificationServices.CreateNotification(notificationNew);

            _responseDto.Result = _mapper.Map<EventDto>(eventToDb);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }
        public async Task<ResponseDto> DeleteEvent(int idEvent)
        {
            var eventToDb = await _unitOfWork.Events.GetAsync(c => c.Id == idEvent);
            if (eventToDb == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = "Event not exist in system";
                return _responseDto;
            }

            await _unitOfWork.Events.DeleteAsync(idEvent);
            await _unitOfWork.SaveChangeAsync();
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> GetEvents()
        {
            var currentUserId = _claimUserServices.GetCurrentUserId();
            var events = await _unitOfWork.Events.GetAllAsync(c => c.UserId == currentUserId);

            _responseDto.Result = _mapper.Map<IEnumerable<EventDto>>(events);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> UpdateEvent(EventDto model)
        {
            var eventInDb = await _unitOfWork.Events.GetAsync(c => c.Id == model.Id);
            if (eventInDb == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = "Event not exist in system";
                return _responseDto;
            }
            var currentUserId = _claimUserServices.GetCurrentUserId();
            var eventToDb = _mapper.Map<Event>(model);

            eventToDb.UpdatedBy = currentUserId;
            eventToDb.CreatedBy = eventInDb.CreatedBy;
            eventToDb.CreatedAt = eventInDb.CreatedAt;
            eventToDb.UpdatedAt = DateTime.Now;
            eventToDb.UserId = eventInDb.UserId;

            await _unitOfWork.Events.UpdateAsync(eventToDb);
            await _unitOfWork.SaveChangeAsync();

            _responseDto.Result = model;
            _responseDto.IsSuccess = true;

            return _responseDto;
        }
    }
}
