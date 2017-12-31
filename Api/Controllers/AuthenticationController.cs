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
        [HttpPost]
        public async Task<IHttpActionResult> UpgradeVIPAsync([FromBody] AccountViewModel account)
        {
            var accountModel = new AccountModel
            {
                Token = account.Token
            };
            var succeed = await _authenticationService.UpgradeUserAsync(accountModel);
            if (succeed)
                return Ok();
            return BadRequest();
        }
    }
}
