using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PersonalApp.DataAccess.Data;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.QuizzAdminServices
{
    public class QuizzAdminServices : IQuizzAdminServices
    {
        private readonly IMapper _mapper;
        private readonly ResponseDto _responseDto;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClaimUserServices _claimUserServices;

        public QuizzAdminServices(IMapper mapper
            , IUnitOfWork unitOfWork
            , IClaimUserServices claimUserServices
            )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _claimUserServices = claimUserServices;
            _responseDto = new ResponseDto();
        }

        public async Task<ResponseDto> CreateQuizz(QuizzCreateDto model)
        {
            try
            {
                var currUserId = _claimUserServices.GetCurrentUserId();
                var dataMap = _mapper.Map<QuizzTest>(model);

                if (dataMap.MultiplechoiceQuestions.Count > 0)
                {
                    dataMap.MultiplechoiceQuestions.ToList().ForEach(c =>
                    {
                        c.CreatedAt = DateTime.Now;
                        c.CreatedBy = currUserId;
                    });
                }

                if (dataMap.EssayQuestions.Count > 0)
                {
                    dataMap.EssayQuestions.ToList().ForEach(c =>
                    {
                        c.CreatedAt = DateTime.Now;
                        c.CreatedBy = currUserId;
                    });
                }

                dataMap.CreatedAt = DateTime.Now;
                dataMap.CreatedBy = currUserId;

                await _unitOfWork.QuizzTest.Add(dataMap);
                await _unitOfWork.SaveChangeAsync();

                _responseDto.Result = _mapper.Map<QuizzDto>(dataMap);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }

        public async Task<ResponseDatas<QuizzDto>> GetQuizzs(int pageIndex, int pageSize)
        {
            var responseData = new ResponseDatas<QuizzDto>();
            try
            {
                var quizzList = await _unitOfWork.QuizzTest.GetAll(queryEntity: c => c.Skip(pageSize * pageIndex).Take(pageSize)
                   , include: c => c.Include(i => i.QuizzTopic)
                   .Include(i => i.MultiplechoiceQuestions)
                   .Include(i => i.EssayQuestions));

                responseData.Datas = _mapper.Map<List<QuizzDto>>(quizzList);
                responseData.TotalItem = (await _unitOfWork.QuizzTest.GetAll()).Count;
            }
            catch (Exception ex)
            {
                responseData.IsSuccess = false;
                responseData.ErrorMessages = ex.ToString();
                throw;
            }

            return responseData;
        }
    }
}
