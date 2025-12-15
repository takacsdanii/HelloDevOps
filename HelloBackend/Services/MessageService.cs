using HelloBackend.DataAccess;
using HelloBackend.Entities;

namespace HelloBackend.Services
{
    public class MessageService : IMessageService
    {
        private readonly MyDbContext _context;

        public MessageService(MyDbContext context)
        {
            _context = context;
        }

        public Message AddMessage(string message)
        {
            var messageObj = new Message
            {
                Text = message
            };

            _context.Messages.Add(messageObj);
            _context.SaveChanges();

            return messageObj;
        }

        public Message GetMessage(int id)
        {
            return _context.Messages.SingleOrDefault(m => m.Id == id);
        }

        public ICollection<Message> GetMessages(string? message)
        {
            if (string.IsNullOrWhiteSpace(message))
                return _context.Messages.ToList();

            return _context.Messages.Where(m => m.Text.Contains(message)).ToList();
        }

        public Message RemoveMessage(int id)
        {
            var message = _context.Messages.SingleOrDefault(m => m.Id == id);
            if(message != null)
            {
                _context.Messages.Remove(message);
                _context.SaveChanges();
            }

            return message;
        }
    }
}
