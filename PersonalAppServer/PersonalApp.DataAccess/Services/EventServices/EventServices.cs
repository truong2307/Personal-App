using AutoMapper;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Services.IdentityServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public class EventServices : IEventServices
    {
        private readonly IMapper _mapper;
        private readonly IIdentityServices _identityServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ResponseDto _responseDto;
        public EventServices(IMapper mapper, IIdentityServices identityServices, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _identityServices = identityServices;   
            _unitOfWork = unitOfWork;
            _responseDto = new ResponseDto();
        }
        public async Task<ResponseDto> CreateEvent(EventDto model)
        {
            try
            {
                var currentUserId = _identityServices.GetCurrentUserId();
                var eventToDb = _mapper.Map<Event>(model);

                eventToDb.UpdatedBy = currentUserId;
                eventToDb.CreatedBy = currentUserId;
                eventToDb.CreatedAt = DateTime.Now;
                eventToDb.UpdatedAt = DateTime.Now;
                eventToDb.UserId = currentUserId;

                await _unitOfWork.Events.Add(eventToDb);
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

        public Task<ResponseDto> GetEvents(string userId)
        {
            throw new NotImplementedException();
        }
    }
}
