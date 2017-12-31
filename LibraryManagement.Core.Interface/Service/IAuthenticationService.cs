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
        Task<bool> UpgradeUserAsync(AccountModel account);
        Task<AccountModel> GetAccountInformationAsync(string token);
    }
}
