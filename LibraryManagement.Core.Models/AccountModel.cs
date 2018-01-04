using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class AccountModel:BaseModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
        public BaseAccountState AccountState { get; set; }
        public string Role { get; set; }


        public AccountModel()
        {
            AccountState = new NormalAccountState();
        }

        public string GetAccountType()
        {
            if (AccountState is NormalAccountState)
                return "Normal";
            if (AccountState is VipAccountState)
                return "VIP";
            return string.Empty;
        }

        public static AccountModel CreateAccount(string type)
        {
            var account = new AccountModel();
            switch (type)
            {
                case "Normal":
                {
                    account.AccountState = new NormalAccountState();
                }
                    break;
                case "VIP":
                    account.AccountState = new VipAccountState();
                    break;
            }
            return account;
        }

        public override BaseModel Clone()
        {
            return new AccountModel();
        }

        public override void CopyData(BaseModel model)
        {
            
        }
    }
}
