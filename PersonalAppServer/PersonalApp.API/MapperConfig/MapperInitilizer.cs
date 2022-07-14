using AutoMapper;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalApp.MapperConfig
{
    public class MapperInitilizer : Profile
    {
        public MapperInitilizer()
        {
            CreateMap<ApiUser, UserDto>().ReverseMap();
            CreateMap<ApiUser, UserForAdminManagerDto>().ReverseMap();
            CreateMap<Event, EventDto>().ReverseMap();
            CreateMap<Event, EventCreateDto>().ReverseMap();
            CreateMap<Notification, NotificationCreateDto>().ReverseMap();
            CreateMap<Notification, NotificationUpdateDto>().ReverseMap();
            CreateMap<Notification, NotificationDto>().ReverseMap();
            CreateMap<ApplicationRole, RoleDto>().ReverseMap();

            //quizz config
            CreateMap<QuizzTest, QuizzDto>().ReverseMap();
            CreateMap<QuizzTest, QuizzCreateDto>().ReverseMap();
            CreateMap<QuizzMultiplechoiceQuestion, QuizzMultiplechoiceQuestionCreateDto>().ReverseMap();
            CreateMap<QuizzMultiplechoiceQuestion, QuizzMultiplechoiceQuestionDto>().ReverseMap();
            CreateMap<QuizzEssayQuestion, QuizzEssayQuestionCreateDto>().ReverseMap();
            CreateMap<QuizzEssayQuestion, QuizzEssayQuestionDto>().ReverseMap();
        }
    }
}
