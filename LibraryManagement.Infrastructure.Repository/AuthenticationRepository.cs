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

        public async Task<bool> UpgradeUserAsync(Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Upgrade", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId}
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
                    var fullName = (string) data["FullName"];
                    var role = (string) data["Role"];
                    var account = AccountModel.CreateAccount(type);
                    account.Id = id;
                    account.Username = username;
                    account.FullName = fullName;
                    account.Role = role;
                    return account;
                }
                return null;
            }
        }

        public async Task<bool> LogoutAsync(string accountToken)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Logout", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Token", accountToken}
                };
                var rowEffect = await db.ExecuteNonQueryAsync(listParams);
                return rowEffect > 0;
            }
        }

        public async Task<bool> DowngradeAsync(Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_Downgrade", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId}
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }

        public async Task<List<AccountModel>> GetListUsersAsync()
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Account_GetAll", DatabaseType.Write))
            {
                var listUsers = new List<AccountModel>();
                var listParams = new Dictionary<string, object>();
                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var id = (Guid)dataReader["Id"];
                    var username = (string)dataReader["Username"];
                    var fullName = (string) dataReader["FullName"];
                    var type = (string)dataReader["Type"];
                    var role = (string) dataReader["Role"];
                    var email = (string) dataReader["EmailAddress"];
                    var phone = (string) dataReader["Phone"];
                    var account = AccountModel.CreateAccount(type);
                    account.Id = id;
                    account.Username = username;
                    account.FullName = fullName;
                    account.Role = role;
                    account.EmailAddress = email;
                    account.Phone = phone;
                    listUsers.Add(account);
                }
                return listUsers;
            }
        }
    }
}
