using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Services.ManageUserServices
{
    public class ManageUserServices : IManageUserServices
    {
        private readonly UserManager<ApiUser> _userManager;
        private readonly IClaimUserServices _claimUserServices;
        private readonly IMapper _mapper;

        public ManageUserServices(
            UserManager<ApiUser> userManager
            , IClaimUserServices claimUserServices
            , IMapper mapper
            )
        {
            _mapper = mapper;
            _claimUserServices = claimUserServices;
            _userManager = userManager;
        }

        public Task<ResponseDto> BlockUser(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseDatas<UserForAdminManagerDto>> GetAllUser()
        {
            var response = new ResponseDatas<UserForAdminManagerDto>();
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                response.Datas = _userManager.Users
                    .Where(c => c.Id != currentUserId)
                    .Select(c => new UserForAdminManagerDto()
                    {
                        UserName = c.UserName,
                        FullName = c.FullName,
                        Email = c.Email,
                        Role = string.Join(",", _userManager.GetRolesAsync(c).Result.ToArray())
                    }).ToList();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            await Task.CompletedTask;
            return response;
        }

        public Task<ResponseDto> UpdateUser(UserForAdminManagerDto model)
        {
            throw new NotImplementedException();
        }
    }
}
