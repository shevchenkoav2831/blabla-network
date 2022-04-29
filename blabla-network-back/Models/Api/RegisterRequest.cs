﻿namespace BlablaNetwork.Models.Api
{
	public class RegisterRequest
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Gender { get; set; }
		public string City { get; set; }
		public string Bio { get; set; }
	}
}

