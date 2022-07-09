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
        private readonly ResponseDto _responseDto;

        public ManageUserServices(
            UserManager<ApiUser> userManager
            , IClaimUserServices claimUserServices
            )
        {
            _claimUserServices = claimUserServices;
            _userManager = userManager;
            _responseDto = new ResponseDto();
        }

        public Task<ResponseDto> BlockUser(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseDatas<UserForAdminManagerDto>> GetAllUser(int pageIndex, int pageSize)
        {
            var response = new ResponseDatas<UserForAdminManagerDto>();
            try
            {
                var currentUserId = _claimUserServices.GetCurrentUserId();
                response.Datas = _userManager.Users
                    .Where(c => c.Id != currentUserId)
                    .Skip(pageSize * pageIndex).Take(pageSize)
                    .OrderBy(c => c.UserName)
                    .Select(c => new UserForAdminManagerDto()
                    {
                        UserId = c.Id,
                        UserName = c.UserName,
                        FullName = c.FullName,
                        Email = c.Email,
                        Role = string.Join(",", _userManager.GetRolesAsync(c).Result.ToArray())
                    }).ToList();

                response.TotalItem = _userManager.Users.Where(c => c.Id != currentUserId).Count();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            await Task.CompletedTask;
            return response;
        }

        public async Task<ResponseDto> UpdateUser(UpdateUserDto model)
        {
            try
            {
                var userInDb = await _userManager.FindByIdAsync(model.UserId);
                if (userInDb == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.ErrorMessages = "User not exist in system";
                    return _responseDto;
                }
                await _userManager.RemoveFromRolesAsync(userInDb
                    , await _userManager.GetRolesAsync(userInDb));

                await _userManager.AddToRoleAsync(userInDb, model.Role);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = ex.ToString();
            }

            return _responseDto;
        }
    }
}
