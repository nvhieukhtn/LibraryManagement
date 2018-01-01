using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Service
{
    public interface IAuthenticationService
    {
        Task<string> LoginAsync(AccountModel account);
        Task<bool> RegisterAsync(AccountModel account);
        Task<bool> UpgradeUserAsync(string token);
        Task<AccountModel> GetAccountInformationAsync(string token);
        Task<bool> LogoutAsync(string accountToken);
        Task<bool> DowngradeAsync(string accountToken);
        Task<List<AccountModel>> GetListUsersAsync();
    }
}
