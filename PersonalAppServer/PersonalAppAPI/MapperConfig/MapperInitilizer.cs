using AutoMapper;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalAppAPI.MapperConfig
{
    public class MapperInitilizer : Profile
    {
        public MapperInitilizer()
        {
            CreateMap<ApiUser, UserDto>().ReverseMap(); 
            CreateMap<Event, EventDto>().ReverseMap(); 
            CreateMap<Event, EventCreateDto>().ReverseMap();
        }
    }
}
