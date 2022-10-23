using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using System.Linq.Expressions;

namespace PersonalApp.DataAccess.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        internal DbSet<T> dbSet;
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            this.dbSet = _context.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await dbSet.FindAsync(id);
            dbSet.Remove(entity);
            await Task.CompletedTask;
        }

        public async Task DeleteRangeAsync(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
            await Task.CompletedTask;
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = dbSet;
            if (include != null)
            {
                query = include(query);
            }

            return await query.AsNoTracking().FirstOrDefaultAsync(filter);
        }

        public async Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> filter = null
            , Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null
            , Func<IQueryable<T>, IQueryable<T>> queryEntity = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (include != null)
            {
                query = include(query);
            }

            if (queryEntity != null)
            {
                query = queryEntity(query);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await Task.CompletedTask;
        }
    }
}
