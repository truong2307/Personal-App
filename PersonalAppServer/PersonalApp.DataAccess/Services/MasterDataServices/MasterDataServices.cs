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
            var quizzTopicMap = _mapper.Map<QuizzTopic>(model);
            var quizzTopic = await _unitOfWork.QuizzTopic.GetAsync(c => c.Name.ToUpper().Trim().Equals(model.Name.ToUpper().Trim()));

            if (quizzTopic is not null)
            {
                _responseDto.ErrorMessages = string.Format("Topic {0} already exist", model.Name);
                return _responseDto;
            }

            await _unitOfWork.QuizzTopic.AddAsync(quizzTopicMap);
            await _unitOfWork.SaveChangeAsync();
            _responseDto.Result = _mapper.Map<QuizzTopicDto>(quizzTopicMap);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> UpdateQuizzTopic(QuizzTopicDto model)
        {
            var quizzTopicMap = _mapper.Map<QuizzTopic>(model);
            var quizzTopic = await _unitOfWork.QuizzTopic.GetAsync(c => c.Name.ToUpper().Trim().Equals(model.Name.ToUpper().Trim()));

            if (quizzTopic is not null)
            {
                _responseDto.ErrorMessages = string.Format("Topic {0} already exist", model.Name);
                return _responseDto;
            }

            await _unitOfWork.QuizzTopic.UpdateAsync(quizzTopicMap);
            await _unitOfWork.SaveChangeAsync();
            _responseDto.Result = _mapper.Map<QuizzTopicDto>(quizzTopicMap);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> DeleteQuizzTopic(int id)
        {
            var quizzTopic = await _unitOfWork.QuizzTopic.GetAsync(c => c.Id == id);
            if (quizzTopic == null)
            {
                _responseDto.ErrorMessages = "Event not exist in system";
                return _responseDto;
            }

            await _unitOfWork.QuizzTopic.DeleteAsync(id);
            await _unitOfWork.SaveChangeAsync();
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDatas<QuizzTopicDto>> GetQuizzTopic(int pageIndex, int pageSize)
        {
            var response = new ResponseDatas<QuizzTopicDto>();
            var quizzTopicsData = await _unitOfWork.QuizzTopic
                                .GetAllAsync(queryEntity: c => c.Skip(pageSize * pageIndex).Take(pageSize)
                                , orderBy: c => c.OrderBy(c => c.Name));

            response.Datas = _mapper.Map<List<QuizzTopicDto>>(quizzTopicsData);
            response.TotalItem = (await _unitOfWork.QuizzTopic.GetAllAsync()).Count;
            response.IsSuccess = true;

            return response;
        }

        public async Task<ResponseDatas<RoleDto>> GetRoles()
        {
            var response = new ResponseDatas<RoleDto>();
            response.Datas = _mapper.Map<List<RoleDto>>(await _unitOfWork.ApplicationRoles.GetAllAsync());
            response.IsSuccess = true;

            return response;
        }
    }
}
