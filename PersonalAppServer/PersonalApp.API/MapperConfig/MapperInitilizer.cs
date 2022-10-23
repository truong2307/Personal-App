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
            CreateMap<QuizzTest, QuizzDto>()
                .ForMember(c => c.ImageUrl, o => o.MapFrom(m => m.GoogleImage.BaseUrl))
                .ReverseMap();
            CreateMap<QuizzTest, QuizzDetailDto>()
                .ForMember(c => c.ImageUrl, o => o.MapFrom(m => m.GoogleImage.BaseUrl))
                .ReverseMap();
            CreateMap<QuizzTest, QuizzCreateDto>().ReverseMap();
            CreateMap<QuizzTest, QuizzUpdateDto>().ReverseMap();
            CreateMap<QuizzMultipleChoiceQuestion, QuizzMultiplechoiceQuestionCreateDto>().ReverseMap();
            CreateMap<QuizzMultipleChoiceQuestion, QuizzMultiplechoiceQuestionUpdateDto>().ReverseMap();
            CreateMap<QuizzMultipleChoiceQuestion, QuizzMultiplechoiceQuestionDto>().ReverseMap();
            CreateMap<QuizzEssayQuestion, QuizzEssayQuestionCreateDto>().ReverseMap();
            CreateMap<QuizzEssayQuestion, QuizzEssayQuestionUpdateDto>().ReverseMap();
            CreateMap<QuizzEssayQuestion, QuizzEssayQuestionDto>().ReverseMap();
            CreateMap<QuizzTopic, QuizzTopicCreateDto>().ReverseMap();
            CreateMap<QuizzTopic, QuizzTopicDto>().ReverseMap();
        }
    }
}
