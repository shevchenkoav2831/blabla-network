namespace BlablaNetwork.Models.Api
{
	public class SendFriendRequestResponse
	{
		public int RequestId { get; set; }
        public SendFriendRequestResponse(int requestId)
        {
			RequestId = requestId;
        }
	}
}

