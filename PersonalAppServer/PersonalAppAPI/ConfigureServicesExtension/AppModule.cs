using PersonalApp.DataAccess.AuthenticationService;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Data.Repository;
using PersonalApp.DataAccess.Initializer;
using PersonalApp.DataAccess.Services.IdentityServices;
using PersonalApp.DataAccess.Services.EventServices;

namespace PersonalAppAPI.ConfigureServicesExtension
{
    public static class AppModule
    {
        public static void ConfigureServiceLifeTime(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IndentityUserSeeding>();
            services.AddScoped<IAuthManager, AuthManager>();
            services.AddScoped<IIdentityServices, IdentityServices>();
            services.AddScoped<IEventServices, EventServices>();
        }
    }
}
