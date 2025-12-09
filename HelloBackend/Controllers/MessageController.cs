using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HelloBackend.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var message = "Hello DevOps World!";
            return Ok(message);
        }
    }
}
