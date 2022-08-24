using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.MasterDataServices
{
    public interface IMasterDataServices
    {
        Task<ResponseDatas<RoleDto>> GetRoles();
        Task<ResponseDatas<QuizzTopicDto>> GetQuizzTopics(int pageIndex, int pageSize);
        Task<ResponseDatas<QuizzTopicDto>> GetQuizzTopics();
        Task<ResponseDto> CreateQuizzTopic(QuizzTopicCreateDto model);
        Task<ResponseDto> UpdateQuizzTopic(QuizzTopicDto model);
        Task<ResponseDto> DeleteQuizzTopic(int id);
    }
}
