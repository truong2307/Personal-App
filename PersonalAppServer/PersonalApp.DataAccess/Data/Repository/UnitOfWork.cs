using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IGenericRepository<Event> _events;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public IGenericRepository<Event> Events => _events ?? new GenericRepository<Event>(_context);

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<bool> SaveChangeAsync()
        {
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
