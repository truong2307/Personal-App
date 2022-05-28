using AutoMapper;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Identity;

namespace PersonalAppAPI.MapperConfig
{
    public class MapperInitilizer : Profile
    {
        public MapperInitilizer()
        {
            CreateMap<ApiUser, UserDto>().ReverseMap();
        }
    }
}
