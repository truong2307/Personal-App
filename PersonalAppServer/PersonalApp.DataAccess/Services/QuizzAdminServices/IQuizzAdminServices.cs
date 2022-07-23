using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.QuizzAdminServices
{
    public interface IQuizzAdminServices
    {
        Task<ResponseDto> CreateQuizz(QuizzCreateDto model);
        Task<ResponseDatas<QuizzDto>> GetQuizzs(int pageIndex, int pageSize);
    }
}
