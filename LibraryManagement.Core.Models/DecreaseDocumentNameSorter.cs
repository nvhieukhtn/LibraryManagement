using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class DecreaseDocumentNameSorter:BaseSorter<Document>
    {
        protected override bool NeedSwap(Document source, Document dest)
        {
            return String.Compare(source.Name, dest.Name, StringComparison.CurrentCultureIgnoreCase) < 0;
        }
    }
}
