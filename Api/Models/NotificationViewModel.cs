using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class NotificationViewModel
    {
        public string Chanel { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}