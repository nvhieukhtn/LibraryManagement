using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Disk:Document
    {
        public override BaseModel Clone()
        {
            return new Disk
            {
                Name = Name,
                Description = Description
            };
        }

        public override string GetDocumentType()
        {
            return "Disk";
        }
    }
}
