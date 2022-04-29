using BlablaNetwork.Models.Entities;

namespace BlablaNetwork.Utils
{
    public interface IJwtUtils
    {
        public string GenerateToken(User user);
        public int? ValidateToken(string token);
    }
}

