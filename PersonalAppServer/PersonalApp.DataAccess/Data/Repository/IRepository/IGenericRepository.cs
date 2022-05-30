namespace PersonalApp.DataAccess.Data.Repository.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IList<T>> GetAll();
        Task<T> Get(int id);
        Task Add(T entity);
        Task AddRange(IEnumerable<T> entities);
        Task Delete(int id);
        void DeleteRange(IEnumerable<T> entities);
        void Update(T entity);
    }
}
