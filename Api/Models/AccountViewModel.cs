using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryManagement.Core.Models;

namespace Api.Models
{
    public class AccountViewModel
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string EmailAddress { get; set; }
        public string Token { get; set; }
        public string Type { get; set; }
        public string Role { get; set; }

        public Guid Id { get; set; }
        public AccountViewModel()
        {
            
        }

        public AccountViewModel(AccountModel account)
        {
            Username = account.Username;
            FullName = account.FullName;
            Phone = account.Phone;
            EmailAddress = account.EmailAddress;
            Type = account.GetAccountType();
            Role = account.Role;
            Id = account.Id;
        }
    }
}