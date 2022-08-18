using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace PersonalApp.DataAccess.Data.Repository.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IList<T>> GetAllAsync(Expression<Func<T, bool>> filter = null
            , Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null
            , Func<IQueryable<T>, IQueryable<T>> queryEntity = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
            );
        Task<T> GetAsync(Expression<Func<T, bool>> filter
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task DeleteAsync(int id);
        Task DeleteRangeAsync(IEnumerable<T> entities);
        Task UpdateAsync(T entity);
    }
}
