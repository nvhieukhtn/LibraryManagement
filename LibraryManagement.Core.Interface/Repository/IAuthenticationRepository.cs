using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Repository
{
    public interface IAuthenticationRepository
    {
        Task<bool> LoginAsync(AccountModel account);
        Task<bool> RegisterAsync(AccountModel account);
        Task<bool> UpgradeUserAsync(AccountModel account);
        Task<AccountModel> GetAccountInformationAsync(string token);
    }
}
