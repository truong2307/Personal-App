using Microsoft.Extensions.DependencyInjection.Extensions;
using PersonalApp.DataAccess.AuthenticationService;
using PersonalApp.DataAccess.Data.Repository;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Initializer;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.DataAccess.Services.EventServices;
using PersonalApp.DataAccess.Services.ManageUserServices;
using PersonalApp.DataAccess.Services.NotificationServices;

namespace PersonalAppAPI.ConfigureServicesExtension
{
    public static class AppModule
    {
        public static void ConfigureServiceLifeTime(this IServiceCollection services)
        {
            services.AddTransient<IndentityUserSeeding>();
            services.TryAddEnumerable(new[]
            {
                ServiceDescriptor.Transient<IUnitOfWork, UnitOfWork>(),
                ServiceDescriptor.Singleton<IHttpContextAccessor, HttpContextAccessor>(),
                ServiceDescriptor.Scoped<IAuthManager, AuthManager>(),
                ServiceDescriptor.Scoped<IEventServices, EventServices>(),
                ServiceDescriptor.Scoped<INotificationServices, NotificationServices>(),
                ServiceDescriptor.Scoped<IClaimUserServices, ClaimUserServices>(),
                ServiceDescriptor.Scoped<IManageUserServices, ManageUserServices>(),
            });
        }
    }
}
