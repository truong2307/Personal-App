using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.MasterDataServices
{
    public interface IMasterDataServices
    {
        Task<ResponseDatas<RoleDto>> GetRoles();
        Task<ResponseDatas<QuizzTopicDto>> GetQuizzTopic(int pageIndex, int pageSize);
        Task<ResponseDto> CreateQuizzTopic(QuizzTopicCreateDto model);
        Task<ResponseDto> DeleteQuizzTopic(int id);
    }
}
