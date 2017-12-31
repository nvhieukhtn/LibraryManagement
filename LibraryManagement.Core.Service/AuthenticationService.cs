using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Service
{
    public class AuthenticationService:IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository;
        private static Dictionary<string, AccountModel> ListOnlineUsers = new Dictionary<string, AccountModel>();
        public AuthenticationService(IAuthenticationRepository authenticationRepository)
        {
            _authenticationRepository = authenticationRepository;
        }

        public async Task<string> LoginAsync(AccountModel account)
        {
            account.Token = Guid.NewGuid().ToString();
            var succeed  = await _authenticationRepository.LoginAsync(account);
            if (succeed)
            {  
                if (ListOnlineUsers.ContainsKey(account.Username))
                    ListOnlineUsers.Add(account.Username, account);
                else
                    ListOnlineUsers[account.Username] = account;
                return account.Token;
            }
            return string.Empty;
        }

        public async Task<bool> RegisterAsync(AccountModel account)
        {
            var succeed = await _authenticationRepository.RegisterAsync(account);
            return succeed;
        }

        public async Task<bool> UpgradeUserAsync(string accountToken)
        {
            var succeed = await _authenticationRepository.UpgradeUserAsync(accountToken);
            return succeed;
        }

        public async Task<AccountModel> GetAccountInformationAsync(string token)
        {
            var account = await _authenticationRepository.GetAccountInformationAsync(token);
            return account;
        }

        public async Task<bool> LogoutAsync(string accountToken)
        {
            var succeed = await _authenticationRepository.LogoutAsync(accountToken);
            return succeed;
        }

        public async Task<bool> DowngradeAsync(string accountToken)
        {
            var succeed = await _authenticationRepository.DowngradeAsync(accountToken);
            return succeed;
        }
    }
}
