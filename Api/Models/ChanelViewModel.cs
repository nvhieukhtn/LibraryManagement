using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryManagement.Core.Models;

namespace Api.Models
{
    public class ChanelViewModel
    {

        public ChanelViewModel(Chanels chanel)
        {
            Name = chanel.Name;
            Description = chanel.Description;
            NumberOfSubscribers = chanel.NumberOfSubscribes;
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int NumberOfSubscribers { get; set; }
    }
}