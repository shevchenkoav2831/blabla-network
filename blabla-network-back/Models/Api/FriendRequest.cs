using BlablaNetwork.Models.Entities;

namespace BlablaNetwork.Models.Api
{
	public class FriendRequest
	{
		public int RequestId { get; set; }
		public User User { get; set; }

		public FriendRequest()
		{
		}
	}
}

