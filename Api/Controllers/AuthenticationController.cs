using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Api.Models;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;
using Unity;

namespace Api.Controllers
{
    [RoutePrefix("Authentication")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUnityContainer _container = DependencyResolution.Container;

        public AuthenticationController()
        {
            _authenticationService = _container.Resolve<IAuthenticationService>();
        }

        [Route("Role")]
        [HttpGet]
        public async Task<IHttpActionResult> GetRoleAsync()
        {
            var permision = Permission.GetPermission(Request.Headers);
            var account = await _authenticationService.GetAccountInformationAsync(permision.AccountToken);
            if (account == null)
                return BadRequest("");
            return Ok(account.Role);
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

        [Route("List")]
        [HttpGet]
        public async Task<IHttpActionResult> GetListUsersAsync()
        {
            var permission = Permission.GetPermission(Request.Headers);
            var listUsers = await _authenticationService.GetListUsersAsync();
            var listViewUsers = listUsers.Select(user => new AccountViewModel(user));
            return Ok(listViewUsers);
        }

        [Route("UpgradeVIP")]
        [HttpPost]
        public async Task<IHttpActionResult> UpgradeVIPAsync([FromBody]AccountViewModel account)
        {
            var succeed = await _authenticationService.UpgradeUserAsync(account.Id);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [Route("Downgrade")]
        [HttpPost]
        public async Task<IHttpActionResult> DowngradeAsync([FromBody]AccountViewModel account)
        {
            var succeed = await _authenticationService.DowngradeAsync(account.Id);
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
