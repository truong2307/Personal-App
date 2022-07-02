using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        public Task<ResponseDatas<UserForAdminManagerDto>> GetAllUser()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseDto> UpdateUser(UserForAdminManagerDto model)
        {
            throw new NotImplementedException();
        }
    }
}
