using HelloBackend.Entities;

namespace HelloBackend.Services
{
    public interface IMessageService
    {
        Message AddMessage(string message);
        Message RemoveMessage(int id);
        Message GetMessage(int id);
        ICollection<Message> GetMessages(string? message);
    }
}
