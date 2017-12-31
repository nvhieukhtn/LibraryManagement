using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Service
{
    public class ChanelService:IChanelService
    {
        private readonly IChanelRepository _chanelRepository;
        private readonly IAuthenticationService _authenticationService;

        public static Dictionary<string, Chanels> ListChanels = new Dictionary<string, Chanels>();

        public ChanelService(IChanelRepository chanelRepository, IAuthenticationService authenticationService)
        {
            _chanelRepository = chanelRepository;
            _authenticationService = authenticationService;
        }

        public async Task<IEnumerable<Notification>> GetAllNotificationsAsync(string accountToken)
        {
            var account = await _authenticationService.GetAccountInformationAsync(accountToken);
            var listNotifications = await _chanelRepository.GetAllNotificationsAsync(account.Id);
            return listNotifications;
        }
        
        private async Task<bool> NotifyAsync(AccountModel account, Notification notification)
        {
            var succeed = await _chanelRepository.NotifyAsync(account.Id, notification);
            return succeed;
        }

        public async Task<bool> NotifyAllsAsync(string chanelName, Notification notification)
        {
            if (ListChanels.ContainsKey(chanelName))
            {
                var currentChanel = ListChanels[chanelName];
                var result = true;
                foreach (var subscriber in currentChanel.ListSubscribers)
                {
                    result &= await NotifyAsync(subscriber.Value, notification);
                }
                return result;
            }
            return false;
        }

        public async Task<bool> SubscribeChanelAsync(string chanelName, string accountToken)
        {
            var account = await _authenticationService.GetAccountInformationAsync(accountToken);

            if (ListChanels.ContainsKey(chanelName))
            {
                var currentChanel = ListChanels[chanelName];
                var succeed = await _chanelRepository.SubscribeChanelAsync(account.Id, currentChanel);
                if(succeed)
                    currentChanel.Subscribe(account);
                return succeed;
            }
            return false;
        }

        public async Task<bool> CreateNewChanelAsync(string chanelName, string description)
        {
            var chanel = new Chanels(chanelName, description);
            var succeed = await _chanelRepository.CreateNewChanelAsync(chanel);
            if(succeed)
                ListChanels.Add(chanelName, chanel);
            return succeed;
        }

        public async Task LoadCachedAsync()
        {
            var listChanels = await _chanelRepository.LoadAllChanelsAsync();
            ListChanels.Clear();
            listChanels.ForEach(async chanel=>
            {
                var chanelFull = await LoadSubcriblesAsync(chanel);
                ListChanels.Add(chanel.Name, chanelFull);
            });
        }

        private async Task<Chanels> LoadSubcriblesAsync(Chanels chanel)
        {
            var listSubcribes = await _chanelRepository.GetAllSubcribes(chanel.Id);
            chanel.ListSubscribers = listSubcribes;
            return chanel;
        }
    }
}
