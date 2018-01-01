using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Service
{
    public interface IChanelService
    {
        Task<IEnumerable<Notification>> GetAllNotificationsAsync(string accountToken);
        Task<bool> NotifyAllsAsync(string chanelName, Notification notification);
        Task<bool> SubscribeChanelAsync(string chanelName, string accountToken);
        Task<bool> CreateNewChanelAsync(string chanelName, string description);
        Task LoadCachedAsync();
        Task<List<Chanels>> GetAllChanelsAsync();
    }
}
