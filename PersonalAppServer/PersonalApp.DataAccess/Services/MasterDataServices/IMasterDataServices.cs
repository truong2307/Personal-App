using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.MasterDataServices
{
    public interface IMasterDataServices
    {
        Task<ResponseDatas<RoleDto>> GetRoles();
    }
}
