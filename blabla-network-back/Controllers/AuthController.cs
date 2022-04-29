using BlablaNetwork.Authorization;
using BlablaNetwork.Models.Api;
using BlablaNetwork.Models.Entities;
using BlablaNetwork.Models.Exceptions;
using BlablaNetwork.Repositories.Users;
using BlablaNetwork.Utils;
using Microsoft.AspNetCore.Mvc;

namespace BlalbaNetwork.Controllers
{
    [AllowAnonymous]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtUtils _jwtUtils;

        public AuthController(IUserRepository userRepository, IJwtUtils jwtUtils)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
        }

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (_userRepository.FindByEmail(request.Email) != null)
                throw new BadHttpRequestException($"Username {request.Email} is already taken");

            var user = new User
            {
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Gender = request.Gender,
                City = request.City,
                Bio = request.Bio
            };
            user.Id = _userRepository.Create(user);

            var token = _jwtUtils.GenerateToken(user);
            return Ok(new SuccessfulLoginResponse(token, user));
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            User? user = _userRepository.FindByEmail(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                throw new AuthorizationException("Username or password is incorrect");

            var token = _jwtUtils.GenerateToken(user);
            return Ok(new SuccessfulLoginResponse(token, user));
        }        

        [Route("verifyToken")]
        public IActionResult VerifyToken([FromQuery]string token)
        {
            // обсирается, если токен валидный, но пользователя нет
            int? userId = _jwtUtils.ValidateToken(token); 
            if (userId == null)
                throw new AuthorizationException("Token is incorrect");

            var user = _userRepository.FindById(userId.Value);
            if (user == null)
                throw new AuthorizationException("Token is incorrect");

            return Ok(new SuccessfulLoginResponse(token, user));       
        }
    }
}
