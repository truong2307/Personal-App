using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Event> Events { get; }
        IGenericRepository<Notification> Notifications { get; }
        IGenericRepository<ApplicationRole> ApplicationRoles { get; }
        IGenericRepository<QuizzTest> QuizzTest { get; }
        IGenericRepository<QuizzTopic> QuizzTopic { get; }
        Task<bool> SaveChangeAsync();
    }
}
