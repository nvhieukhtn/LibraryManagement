using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class AccountViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string EmailAddress { get; set; }
        public string Token { get; set; }
    }
}