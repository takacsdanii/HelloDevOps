using HelloBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace HelloBackend.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("{id}")]
        public IActionResult GetMessage(int id)
        {
            var message = _messageService.GetMessage(id);
            return message != null ? Ok(message) : NotFound();
        }

        [HttpGet]
        public IEnumerable GetMessages(string? message)
        {
            return _messageService.GetMessages(message);
        }

        [HttpGet("greetings")]
        public IActionResult GetGreetings()
        {
            return Ok("Greetings from MessageController!");
        }

        [HttpPost]
        public IActionResult AddMessage(string text)
        {
            var message = _messageService.AddMessage(text);
            return Ok(message);
        }

        [HttpDelete]
        public IActionResult DeleteMessage(int id)
        {
            var message = _messageService.RemoveMessage(id);
            return message != null ? Ok(message) : NotFound();
        }
    }
}
