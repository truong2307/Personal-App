using AutoMapper;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Dto;

namespace PersonalApp.DataAccess.Services.MasterDataServices
{
    public class MasterDataServices : IMasterDataServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MasterDataServices(
            IUnitOfWork unitOfWork
            , IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDatas<RoleDto>> GetRoles()
        {
            var response = new ResponseDatas<RoleDto>();

            try
            {
                response.Datas = _mapper.Map<List<RoleDto>>(await _unitOfWork.ApplicationRoles.GetAll());
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = ex.ToString();
            }

            return response;
        }
    }
}
