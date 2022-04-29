using System.Text.Json.Serialization;

namespace BlablaNetwork.Models.Entities
{
	public class User
	{
		public int Id { get; set; }
		public string Email { get; set; }
		[JsonIgnore]
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Gender { get; set; }
		public string City { get; set; }
		public string Bio { get; set; }

		public User() { }

		public User(string email, string password)
        {
			Email = email;
			Password = password;
        }

		
	}
}
