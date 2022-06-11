using AutoMapper;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;
using System.Text;

namespace PersonalApp.DataAccess.Services.EventServices
{
    public class EventServices : IEventServices
    {
        private readonly IMapper _mapper;
        private readonly IClaimUserServices _claimUserServices;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ResponseDto _responseDto;
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        public EventServices(IMapper mapper
            , IClaimUserServices claimUserServices
            , IUnitOfWork unitOfWork
            , IConfiguration config)
        {
            _mapper = mapper;
            _claimUserServices = claimUserServices;
            _unitOfWork = unitOfWork;
            _responseDto = new ResponseDto();
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
        }
        public async Task<ResponseDto> CreateEvent(EventDto model)
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
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
        public async Task<ResponseDto> DeleteEvent(int idEvent)
        {
            try
            {
                var eventToDb = await _unitOfWork.Events.Get(c => c.Id == idEvent);
                if (eventToDb == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Event not exist in system";
                    return _responseDto;
                }

                await _unitOfWork.Events.Delete(idEvent);
                await _unitOfWork.SaveChangeAsync();
            }
            catch (Exception ex)
            {

                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDto> GetEventById(int idEvent)
        {
            try
            {
                var eventToDb = await _unitOfWork.Events.Get(c => c.Id == idEvent);
                if (eventToDb == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Event not exist in system";
                    return _responseDto;
                }

                _responseDto.Result = _mapper.Map<EventDto>(eventToDb);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDto> GetEvents()
        {
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();

                using (var db = new SqlConnection(_connectionString))
                {
                    db.Open();

                    var sql = new StringBuilder();

                    sql.AppendLine("SELECT e.Id, e.Title, e.StartDate, e.EndDate, e.UserId, e.Description FROM Events e");
                    sql.AppendLine("WHERE e.UserId = @currentUserId ");

                    var result = await db.QueryAsync<Event>(sql.ToString(), param: new { currentUserId = currentUserId });

                    _responseDto.Result = _mapper.Map<IEnumerable<EventDto>>(result);
                }
            }
            catch (Exception ex)
            {
                _responseDto.ErrorMessages=ex.ToString();
                _responseDto.IsSuccess = false;
            }

            return _responseDto;
        }

        public async Task<ResponseDto> UpdateEvent(EventUpdateDto model)
        {
            try
            {
                var eventInDb = await _unitOfWork.Events.Get(c => c.Id == model.Id);
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

                await _unitOfWork.Events.Update(eventToDb);
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
