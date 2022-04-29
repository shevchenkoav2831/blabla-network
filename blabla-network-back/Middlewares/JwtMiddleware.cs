using BlablaNetwork.Repositories.Users;
using BlablaNetwork.Utils;

namespace BlablaNetwork.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserRepository userRepository, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateToken(token);

            if (userId != null)
                context.Items["User"] = userRepository.FindById(userId.Value);

            await _next(context);
        }
    }
}

