using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class UpdateInformationViewModel
    {
        public int Handle { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
    }
}