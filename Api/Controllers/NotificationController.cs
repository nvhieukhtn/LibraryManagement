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
    [RoutePrefix("Notification")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NotificationController : ApiController
    {
        private readonly IChanelService _chanelService;
        private readonly IUnityContainer _container = DependencyResolution.Container;

        public NotificationController()
        {
            _chanelService = _container.Resolve<IChanelService>();
        }

        [HttpGet]
        [Route("AllChanels")]
        public async Task<IHttpActionResult> GetAllChanelsAsync(bool subscribe)
        {
            var permision = Permission.GetPermission(Request.Headers);
            var listChanels = await _chanelService.GetAllChanelsAsync(subscribe, permision.AccountToken);
            var listViewChanels = listChanels.Select(chanel => new ChanelViewModel(chanel)).ToList();
            return Ok(listViewChanels);
        }
        [HttpPost]
        [Route("CreateChanel")]
        public async Task<IHttpActionResult> CreateChanelAsync([FromBody] ChanelViewModel chanel)
        {
            var permission = Permission.GetPermission(Request.Headers);
            if (string.IsNullOrEmpty(permission.AccountToken))
                return BadRequest();
            var succeed = await _chanelService.CreateNewChanelAsync(chanel.Name, chanel.Description);
            if(succeed)
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("SubscribeChanel/{chanelName}")]
        public async Task<IHttpActionResult> SubscribeChanelAsync(string chanelName)
        {
            var permission = Permission.GetPermission(Request.Headers);
            if (string.IsNullOrEmpty(permission.AccountToken))
                return BadRequest();
            var succeed = await _chanelService.SubscribeChanelAsync(chanelName, permission.AccountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("PullNotification")]
        public async Task<IHttpActionResult> PullNotificationAsync()
        {
            var permission = Permission.GetPermission(Request.Headers);
            if (string.IsNullOrEmpty(permission.AccountToken))
                return BadRequest();
            var listNotifications = await _chanelService.GetAllNotificationsAsync(permission.AccountToken);
            return Ok(listNotifications);
        }

        [HttpPost]
        [Route("PushNotification")]
        public async Task<IHttpActionResult> PushNotificationAsync([FromBody] NotificationViewModel notification)
        {
            var permission = Permission.GetPermission(Request.Headers);
            if (string.IsNullOrEmpty(permission.AccountToken))
                return BadRequest();
            var notificationModel = new Notification
            {
                Content = notification.Content,
                Title = notification.Title
            };
            var succeed = await _chanelService.NotifyAllsAsync(notification.Chanel, notificationModel);
            if (succeed)
                return Ok();
            return BadRequest();
        }
    }
}
