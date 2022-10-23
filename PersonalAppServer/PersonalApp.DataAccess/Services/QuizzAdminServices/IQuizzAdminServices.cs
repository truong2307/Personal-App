using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.QuizzAdminServices
{
    public interface IQuizzAdminServices
    {
        Task<ResponseDatas<QuizzDto>> GetQuizzs(int pageIndex, int pageSize);
        Task<ResponseDto> GetQuizzById(int id);
        Task<ResponseDto> CreateQuizz(QuizzCreateDto model);
        Task<ResponseDto> UpdateQuizz(QuizzUpdateDto model);
        Task<ResponseDto> DeleteQuizz(int quizzId);

    }
}
