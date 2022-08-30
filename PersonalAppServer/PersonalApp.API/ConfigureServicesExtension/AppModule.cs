using Microsoft.Extensions.DependencyInjection.Extensions;
using PersonalApp.DataAccess.AuthenticationService;
using PersonalApp.DataAccess.Data.Repository;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Helper.GoogleApi;
using PersonalApp.DataAccess.Initializer;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.DataAccess.Services.EventServices;
using PersonalApp.DataAccess.Services.ManageUserServices;
using PersonalApp.DataAccess.Services.MasterDataServices;
using PersonalApp.DataAccess.Services.NotificationServices;
using PersonalApp.DataAccess.Services.QuizzAdminServices;

namespace PersonalApp.ConfigureServicesExtension
{
    public static class AppModule
    {
        public static void ConfigureServiceLifeTime(this IServiceCollection services)
        {
            services.AddHttpClient<IGooglePhotoHelper, GooglePhotoHelper>();
            services.AddTransient<IndentityUserSeeding>();
            services.AddSingleton<IGooglePhotoHelper, GooglePhotoHelper>();
            services.TryAddEnumerable(new[]
            {
                ServiceDescriptor.Transient<IUnitOfWork, UnitOfWork>(),
                ServiceDescriptor.Singleton<IHttpContextAccessor, HttpContextAccessor>(),
                ServiceDescriptor.Scoped<IAuthManager, AuthManager>(),
                ServiceDescriptor.Scoped<IEventServices, EventServices>(),
                ServiceDescriptor.Scoped<INotificationServices, NotificationServices>(),
                ServiceDescriptor.Scoped<IClaimUserServices, ClaimUserServices>(),
                ServiceDescriptor.Scoped<IManageUserServices, ManageUserServices>(),
                ServiceDescriptor.Scoped<IMasterDataServices, MasterDataServices>(),
                ServiceDescriptor.Scoped<IQuizzAdminServices, QuizzAdminServices>(),

            });

        }
    }
}
