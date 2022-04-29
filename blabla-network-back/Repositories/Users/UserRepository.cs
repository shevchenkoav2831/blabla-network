using System.Data;
using BlablaNetwork.Models.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace BlablaNetwork.Repositories.Users
{
    public class UserRepository : IUserRepository
	{
        private readonly ILogger _logger;
        private readonly string _connectionString;
        
		public UserRepository(IConfiguration configuration, ILogger<UserRepository> logger)
		{
            _connectionString = configuration.GetConnectionString("MySQLDatabase");
            _logger = logger;
        }

        public IEnumerable<User> FindAll()
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            return db.Query<User>("SELECT * FROM Users").ToList();
        }

        public User? FindById(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            return db.Query<User>("SELECT * FROM Users WHERE id = @id", new { id }).FirstOrDefault();
        }

        public User? FindByEmail(string email)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            return db.Query<User>("SELECT * FROM Users WHERE email = @email", new { email }).FirstOrDefault();
        }

        public IEnumerable<User> FindByFirstnameAndLastname(string firstName, string lastName)
        {
            firstName += "%";
            lastName += "%";

            using IDbConnection db = new MySqlConnection(_connectionString);
            return db.Query<User>(
                "SELECT * FROM Users WHERE firstName LIKE @firstName AND lastName LIKE @lastName",
                new { firstName, lastName });
            
        }

        public int Create(User entity)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            return db.Query<int>(
                "INSERT INTO Users (Email, Password, FirstName, LastName, Gender, City, Bio) VALUES (@Email, @Password, @FirstName, @LastName, @Gender, @City, @Bio); SELECT LAST_INSERT_ID()",
                entity).First();
        }

        public void Update(User entity)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            db.Execute("UPDATE Users SET Email = @Email, FirstName = @FirstName, LastName = @LastName, Gender = @Gender, City = @City, Bio = @Bio WHERE Id = @Id", entity);
        }

        public void Delete(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            db.Execute("DELETE FROM Users WHERE Id = @id", new { id });
        }        
    }
}

