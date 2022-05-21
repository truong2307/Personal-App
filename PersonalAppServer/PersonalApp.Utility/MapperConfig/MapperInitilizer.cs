using AutoMapper;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Identity;
using System.Diagnostics.Metrics;

namespace PersonalApp.Utility.MapperConfig
{
    public class MapperInitilizer : Profile
    {
        public MapperInitilizer()
        {
            CreateMap<ApiUser, UserDto>().ReverseMap();
        }
    }
}
