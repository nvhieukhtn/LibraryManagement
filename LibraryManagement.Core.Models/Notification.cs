using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Notification
    {
        public string Title { get; set; }
        public string Chanel { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
    }
}
