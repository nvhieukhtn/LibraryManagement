using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Models;
using LibraryManagement.Shared;

namespace LibraryManagement.Infrastructure.Repository
{
    public class AuthenticationRepository:IAuthenticationRepository
    {
        public async Task<bool> LoginAsync(AccountModel account)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Login", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Username", account.Username},
                    {"Password", account.Password},
                    {"Token", account.Token }
                };
                var rowEffect = await db.ExecuteNonQueryAsync(listParams);
                return rowEffect > 0;
            }
        }

        public async Task<bool> RegisterAsync(AccountModel account)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Register", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Username", account.Username},
                    {"Password", account.Password},
                    {"Phone", account.Phone },
                    {"EmailAddress", account.EmailAddress },
                    {"Type", account.GetAccountType() }
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }

        public async Task<bool> UpgradeUserAsync(AccountModel account)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Upgrade", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Token", account.Token}
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }

        public async Task<AccountModel> GetAccountInformationAsync(string token)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Get", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Token", token}
                };
                var data = await db.ExecuteReaderAsync(listParams);
                if (data.Read())
                {
                    var id = (Guid) data["Id"];
                    var username = (string) data["Username"];
                    var type = (string)data["Type"];
                    var account = AccountModel.CreateAccount(id, username, type);
                    return account;
                }
                return null;
            }
        }
    }
}
