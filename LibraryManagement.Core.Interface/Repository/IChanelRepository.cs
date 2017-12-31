using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Repository
{
    public interface IChanelRepository
    {
        Task<List<Chanels>> LoadAllChanelsAsync();
        Task<bool> NotifyAsync(Guid userId, Notification notification);
        Task<List<Notification>> GetAllNotificationsAsync(Guid userId);
        Task<bool> CreateNewChanelAsync(Chanels chanel);
        Task<bool> FollowChanelAsync(Guid userId, Chanels chanel);
        Task<List<AccountModel>> GetAllSubcribes(Guid chanelId);
    }
}
