using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace PersonalApp.DataAccess.Data.Repository.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IList<T>> GetAll(Expression<Func<T, bool>> filter = null
            , Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null
            , Func<IQueryable<T>, IQueryable<T>> queryEntity = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
            );
        Task<T> Get(Expression<Func<T, bool>> filter
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task Add(T entity);
        Task AddRange(IEnumerable<T> entities);
        Task Delete(int id);
        Task DeleteRange(IEnumerable<T> entities);
        Task Update(T entity);
    }
}
