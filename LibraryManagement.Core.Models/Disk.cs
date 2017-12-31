using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Disk:Document
    {
        public string Major { get; set; }
        public override Document Clone()
        {
            return new Disk
            {
                Major = Major,
                Name = Name,
                Description = Description
            };
        }
    }
}
