using BlablaNetwork.Models.Entities;

namespace BlablaNetwork.Repositories.Users
{
    public interface IUserRepository : IRepository<User>
	{
		User? FindByEmail(string email);
		IEnumerable<User> FindByFirstnameAndLastname(string firstName, string lastName);

	}
}

