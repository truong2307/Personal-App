using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.ManageUserServices
{
    public interface IManageUserServices
    {
        Task<ResponseDatas<UserForAdminManagerDto>> GetAllUser();
        Task<ResponseDto> UpdateUser(UpdateUserDto model);
        Task<ResponseDto> BlockUser(string userId);
    }
}
