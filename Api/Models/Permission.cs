using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;

namespace Api.Models
{
    public class Permission
    {
        private string _accountToken;
        public string AccountToken
        {
            get => _accountToken ?? string.Empty;
            private set => _accountToken = value;
        }

        public static Permission GetPermission(HttpRequestHeaders headers)
        {
            var permission = new Permission();
            try
            {
                var token = headers.GetValues("Session").FirstOrDefault();
                permission.AccountToken = token;
                return permission;
            }
            catch (Exception)
            {
                return permission;
            }
        }
    }
}