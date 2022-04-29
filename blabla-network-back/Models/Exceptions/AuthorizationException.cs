using System;
using System.Globalization;

namespace BlablaNetwork.Models.Exceptions
{
	public class AuthorizationException : Exception
	{
		public AuthorizationException() : base() { }

		public AuthorizationException(string message) : base(message) { }

		public AuthorizationException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
	}
}

