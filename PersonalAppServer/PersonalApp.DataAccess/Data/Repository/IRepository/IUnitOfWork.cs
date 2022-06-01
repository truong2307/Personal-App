using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Event> Events { get; }
        Task<bool> SaveChangeAsync();
    }
}
