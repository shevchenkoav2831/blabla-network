using BlablaNetwork.Models.Api;
using BlablaNetwork.Repositories.Friends;
using Microsoft.AspNetCore.Mvc;

namespace BlablaNetwork.Controllers
{
    [Route("api/v1/users/{userId}/friends")]
    public class FriendsController : ControllerBase
	{
        private readonly ILogger _logger;
        private readonly IFriendsRepository _friendsRepository;

		public FriendsController(ILogger<FriendsController> logger, IFriendsRepository friendsRepository)
		{
            _logger = logger;
            _friendsRepository = friendsRepository;
		}

        [HttpGet]
        public IActionResult GetFriendList(int userId)
        {
            return Ok(_friendsRepository.GetFriendList(userId));
        }

        [HttpGet, Route("requests")]
        public IActionResult GetFriendRequests(int userId)
        {
            return Ok(_friendsRepository.GetFriendRequests(userId));
        }

        [HttpPost, Route("{friendId}")]
        public IActionResult SendFriendRequest(int userId, int friendId)
        {
            var requestId = _friendsRepository.SendRequest(userId, friendId);
            return Ok(new SendFriendRequestResponse(requestId));
        }

        [HttpPost, Route("approve")]
        public IActionResult ApproveRequest(int userId, [FromQuery]int requestId)
        {
            _friendsRepository.ApproveRequest(userId, requestId);
            return Ok();
        }

        [HttpPost, Route("reject")]
        public IActionResult RejectRequest(int userId, [FromQuery]int requestId)
        {
            _friendsRepository.RejectRequest(userId, requestId);
            return Ok();
        }
    }
}

