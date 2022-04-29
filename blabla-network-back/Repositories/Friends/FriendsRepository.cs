using System.Data;
using BlablaNetwork.Models.Api;
using BlablaNetwork.Models.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace BlablaNetwork.Repositories.Friends
{
    public class FriendsRepository : IFriendsRepository
	{
        private readonly ILogger _logger;
        private readonly string _connectionString;

        public FriendsRepository(IConfiguration configuration, ILogger<FriendsRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("MySQLDatabase");
            _logger = logger;
        }

        public IEnumerable<FriendRequest> GetFriendRequests(int userId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string query = "SELECT f.ID as RequestId, u.* FROM db.Friends f " +
                "LEFT JOIN db.Users u ON u.ID = f.UserOne " +
                "WHERE UserTwo = @userId AND Status = @requestStatus";
            return db.Query<FriendRequest, User, FriendRequest>(
                query,
                (friendRequest, user) => { friendRequest.User = user; return friendRequest; },
                new { userId, requestStatus = FriendshipStatus.REQUESTED});
        }

        public IEnumerable<User> GetFriendList(int userId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string query = "SELECT u.* FROM db.Friends f, db.Users u " +
                "WHERE CASE " +
                    "WHEN f.UserOne = @userId THEN f.UserTwo = u.Id " +
                    "WHEN f.UserTwo = @userId THEN f.UserOne = u.Id " +
                    "END " +
                "AND f.Status = @requestStatus";
            return db.Query<User>(query, new { userId, requestStatus = FriendshipStatus.APPROVED });
        }

        public int SendRequest(int userOneId, int userTwoId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);

            // check for existing request
            string query = "SELECT ID FROM Friends WHERE UserOne = @userOneId AND UserTwo = @userTwoId AND Status = @requestStatus";
            int? existingRequest = db.Query<int?>(query, new { userOneId, userTwoId, requestStatus = FriendshipStatus.REQUESTED }).FirstOrDefault();
            if (existingRequest != null)
                return existingRequest.Value;

            query = "INSERT INTO db.Friends(UserOne, UserTwo, Status) VALUES(@userOneId, @userTwoId, @requestStatus);" +
                    "SELECT LAST_INSERT_ID()";
            return db.Query<int>(query, new { userOneId, userTwoId, requestStatus = FriendshipStatus.REQUESTED }).First();
        }

        public void ApproveRequest(int userId, int requestId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string query = "UPDATE db.Friends SET Status = @requestStatus WHERE UserTwo = @userId AND Id = @requestId";
            db.Execute(query, new { requestStatus = FriendshipStatus.APPROVED, userId, requestId });
        }

        public void RejectRequest(int userId, int requestId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string query = "DELETE FROM db.Friends WHERE UserTwo = @userId AND Id = @requestId";
            db.Execute(query, new { requestStatus = FriendshipStatus.REJECTED, userId, requestId });
        }
    }
}

