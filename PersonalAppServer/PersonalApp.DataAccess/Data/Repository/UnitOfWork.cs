using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IGenericRepository<Event> _events;
        private IGenericRepository<Notification> _notifications;
        private IGenericRepository<ApplicationRole> _applicationRole;
        private IGenericRepository<QuizzTest> _quizzTest;
        private IGenericRepository<QuizzTopic> _quizzTopic;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<Event> Events => _events ?? new GenericRepository<Event>(_context);

        public IGenericRepository<Notification> Notifications => _notifications ?? new GenericRepository<Notification>(_context);

        public IGenericRepository<ApplicationRole> ApplicationRoles => _applicationRole ?? new GenericRepository<ApplicationRole>(_context);

        public IGenericRepository<QuizzTest> QuizzTest => _quizzTest ?? new GenericRepository<QuizzTest>(_context);

        public IGenericRepository<QuizzTopic> QuizzTopic => _quizzTopic ?? new GenericRepository<QuizzTopic>(_context);

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
