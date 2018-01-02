using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class BorrowedDocument:Document
    {
        public DateTime BorrowedOn { get; set; }
        public DateTime? ReturnOn { get; set; }
        public override Document Clone()
        {
            return this;
        }

        public string Type { get; set; }
        public string GroupName { get; set; }
        public override string GetDocumentType()
        {
            return string.Empty;
        }
    }
}
