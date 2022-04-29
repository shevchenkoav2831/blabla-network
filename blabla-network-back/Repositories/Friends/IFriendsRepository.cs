using BlablaNetwork.Models.Api;
using BlablaNetwork.Models.Entities;

namespace BlablaNetwork.Repositories.Friends
{
    public interface IFriendsRepository
	{
		IEnumerable<User> GetFriendList(int userId);
		IEnumerable<FriendRequest> GetFriendRequests(int userId);
		int SendRequest(int userOneId, int userTwoId);
		void ApproveRequest(int userId, int requestId);
		void RejectRequest(int userId, int requestId);

	}
}

