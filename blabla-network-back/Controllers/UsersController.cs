using BlablaNetwork.Authorization;
using BlablaNetwork.Models.Entities;
using BlablaNetwork.Repositories.Users;
using BlablaNetwork.Utils;
using Microsoft.AspNetCore.Mvc;

namespace BlalbaNetwork.Controllers
{
    [Authorize]
    [Route("/api/v1/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtUtils _jwtUtils;
        public UsersController(IUserRepository userRepository, IJwtUtils jwtUtils)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
        }

        [HttpGet]
        public IActionResult FindAll()
        {
            return Ok(_userRepository.FindAll());
        }

        [HttpGet, Route("{userId}")]
        public IActionResult FindById(int userId)
        {
            return Ok(_userRepository.FindById(userId));
        }

        [HttpGet, Route("search")]
        public IActionResult FindByFirstnameAndLastname([FromQuery]string firstName, [FromQuery]string lastName)
        {
            return Ok(_userRepository.FindByFirstnameAndLastname(firstName, lastName));
        }


        [HttpPost, Route("{userId}")]
        public IActionResult EditUser(int userId, [FromBody]User user)
        {
            user.Id = userId;
            _userRepository.Update(user);
            return Ok(user);
        }

        [HttpDelete, Route("{userId}")]
        public IActionResult DeleteById(int userId)
        {
            _userRepository.Delete(userId);
            return Ok();
        }

        
    }
}


