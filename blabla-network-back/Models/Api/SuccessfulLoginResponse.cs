using BlablaNetwork.Models.Entities;

namespace BlablaNetwork.Models.Api
{
	public class SuccessfulLoginResponse
	{
		public string Token { get; set; }
		public User User { get; set; }

		public SuccessfulLoginResponse(string token, User user)
        {
			Token = token;
			User = user;
        }
	}
}

