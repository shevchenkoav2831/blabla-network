namespace BlablaNetwork.Repositories
{
	public interface IRepository<T>
	{
		IEnumerable<T> FindAll();
		T? FindById(int id);
		int Create(T entity);
		void Update(T entity);
		void Delete(int id);
		
	}
}

