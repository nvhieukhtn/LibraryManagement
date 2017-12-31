using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Api.Models;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;
using Unity;

namespace Api.Controllers
{
    [RoutePrefix("Authentication")]
    public class AuthenticationController : ApiController
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUnityContainer _container = DependencyResolution.Container;

        public AuthenticationController()
        {
            _authenticationService = _container.Resolve<IAuthenticationService>();
        }
        [Route("Login")]
        [HttpPost]
        public async Task<IHttpActionResult> LoginAsync([FromBody] AccountViewModel account)
        {
            var accountModel = new AccountModel
            {
                Username = account.Username,
                Password = account.Password
            };
            var token = await _authenticationService.LoginAsync(accountModel);
            if (string.IsNullOrEmpty(token))
                return BadRequest();
            return Ok(token);
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IHttpActionResult> RegisterAsync([FromBody] AccountViewModel account)
        {
            var accountModel = new AccountModel
            {
                Username = account.Username,
                Password = account.Password,
                EmailAddress = account.EmailAddress,
                Phone = account.Phone
            };
            var succeed = await _authenticationService.RegisterAsync(accountModel);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [Route("UpgradeVIP")]
        [HttpPut]
        public async Task<IHttpActionResult> UpgradeVIPAsync()
        {
            var headers = Request.Headers;

            var accountToken = headers.GetValues("Session").FirstOrDefault();
            var succeed = await _authenticationService.UpgradeUserAsync(accountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [Route("Downgrade")]
        [HttpPut]
        public async Task<IHttpActionResult> DowngradeAsync()
        {
            var permission = Permission.GetPermission(Request.Headers);
            var succeed = await _authenticationService.DowngradeAsync(permission.AccountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }
        [Route("Logout")]
        [HttpPost]
        public async Task<IHttpActionResult> LogoutAsync()
        {
            var headers = Request.Headers;

            var accountToken = headers.GetValues("Session").FirstOrDefault();
            var succeed = await _authenticationService.LogoutAsync(accountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }
    }
}
