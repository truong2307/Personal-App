using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.ManageUserServices
{
    public interface IManageUserServices
    {
        Task<ResponseDatas<UserForAdminManagerDto>> GetAllUser(int pageIndex, int pageSize);
        Task<ResponseDto> UpdateUser(UpdateUserDto model);
        Task<ResponseDto> BlockUser(string userId);
    }
}
