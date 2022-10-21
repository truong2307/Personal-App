using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.Models.Entities;
using PersonalApp.Models.Identity;

namespace PersonalApp.DataAccess.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IGenericRepository<Event> _events;
        private readonly IGenericRepository<Notification> _notifications;
        private readonly IGenericRepository<ApplicationRole> _applicationRole;
        private readonly IGenericRepository<QuizzTest> _quizzTest;
        private readonly IGenericRepository<QuizzTopic> _quizzTopic;
        private readonly IGenericRepository<QuizzMultiplechoiceQuestion> _quizzMultiplechoiceQuestion;
        private readonly IGenericRepository<QuizzEssayQuestion> _quizzEssayQuestion;
        private readonly IGenericRepository<GoogleImage> _googleImage;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<Event> Events => _events ?? new GenericRepository<Event>(_context);

        public IGenericRepository<Notification> Notifications => _notifications ?? new GenericRepository<Notification>(_context);

        public IGenericRepository<ApplicationRole> ApplicationRoles => _applicationRole ?? new GenericRepository<ApplicationRole>(_context);

        public IGenericRepository<QuizzTest> QuizzTest => _quizzTest ?? new GenericRepository<QuizzTest>(_context);

        public IGenericRepository<QuizzTopic> QuizzTopic => _quizzTopic ?? new GenericRepository<QuizzTopic>(_context);

        public IGenericRepository<QuizzMultiplechoiceQuestion> QuizzMultiplechoiceQuestion => _quizzMultiplechoiceQuestion ?? new GenericRepository<QuizzMultiplechoiceQuestion>(_context);

        public IGenericRepository<QuizzEssayQuestion> QuizzEssayQuestion => _quizzEssayQuestion ?? new GenericRepository<QuizzEssayQuestion>(_context);

        public IGenericRepository<GoogleImage> GoogleImage => _googleImage ?? new GenericRepository<GoogleImage>(_context);

        public void Dispose() => _context.Dispose();

        public async Task<bool> SaveChangeAsync()
        {
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
