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
    [RoutePrefix("Notification")]
    public class NotificationController : ApiController
    {
        private readonly IChanelService _chanelService;
        private readonly IUnityContainer _container = DependencyResolution.Container;

        public NotificationController()
        {
            _chanelService = _container.Resolve<IChanelService>();
        }
        [HttpPost]
        [Route("CreateChanel")]
        public async Task<IHttpActionResult> CreateChanelAsync([FromBody] ChanelViewModel chanel)
        {
            var headers = Request.Headers;

            var token = headers.GetValues("Session").FirstOrDefault();
            var succeed = await _chanelService.CreateNewChanelAsync(chanel.Name, chanel.Description);
            if(succeed)
                return Ok();
            return BadRequest();
        }

        [HttpPut]
        [Route("FollowChanel/{chanelName}")]
        public async Task<IHttpActionResult> FollowChanelAsync(string chanelName)
        {
            var headers = Request.Headers;

            var token = headers.GetValues("Session").FirstOrDefault();
            var succeed = await _chanelService.FollowChanelAsync(chanelName, token);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("PullNotification")]
        public async Task<IHttpActionResult> PullNotificationAsync()
        {
            var headers = Request.Headers;

            var token = headers.GetValues("Session").FirstOrDefault();
            var listNotifications = await _chanelService.GetAllNotificationsAsync(token);
            return Ok(listNotifications);
        }

        [HttpPost]
        [Route("PushNotification")]
        public async Task<IHttpActionResult> PushNotificationAsync([FromBody] NotificationViewModel notification)
        {
            var headers = Request.Headers;

            var token = headers.GetValues("Session").FirstOrDefault();
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
