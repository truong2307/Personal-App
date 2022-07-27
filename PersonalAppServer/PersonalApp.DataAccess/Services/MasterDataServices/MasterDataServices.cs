using AutoMapper;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.MasterDataServices
{
    public class MasterDataServices : IMasterDataServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ResponseDto _responseDto;

        public MasterDataServices(
            IUnitOfWork unitOfWork
            , IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _responseDto = new ResponseDto();
        }

        public async Task<ResponseDto> CreateQuizzTopic(QuizzTopicCreateDto model)
        {
            try
            {
                var dataMap = _mapper.Map<QuizzTopic>(model);

                await _unitOfWork.QuizzTopic.Add(dataMap);
                await _unitOfWork.SaveChangeAsync();

                _responseDto.Result = _mapper.Map<QuizzTopicDto>(dataMap);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }
            
            return _responseDto;
        }

        public async Task<ResponseDto> DeleteQuizzTopic(int id)
        {
            try
            {
                var quizzTopic = _unitOfWork.QuizzTopic.Get(c => c.Id == id);
                if (quizzTopic == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "Event not exist in system";
                    return _responseDto;
                }

                await _unitOfWork.QuizzTopic.Delete(id);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDatas<QuizzTopicDto>> GetQuizzTopic()
        {
            var response = new ResponseDatas<QuizzTopicDto>();
            try
            {
                response.Datas = _mapper.Map<List<QuizzTopicDto>>(await _unitOfWork.QuizzTopic.GetAll());
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            return response;
        }

        public async Task<ResponseDatas<RoleDto>> GetRoles()
        {
            var response = new ResponseDatas<RoleDto>();

            try
            {
                response.Datas = _mapper.Map<List<RoleDto>>(await _unitOfWork.ApplicationRoles.GetAll());
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            return response;
        }
    }
}
