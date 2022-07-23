using AutoMapper;
using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.QuizzAdminServices
{
    public class QuizzAdminServices : IQuizzAdminServices
    {
        private readonly IMapper _mapper;

        public QuizzAdminServices(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<ResponseDatas<QuizzDto>> CreateQuizz(QuizzCreateDto model)
        {
            throw new NotImplementedException();


        }

        public Task<ResponseDatas<QuizzDto>> GetQuizzs(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}
