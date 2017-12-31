using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class LibraryFactory
    {
        private static readonly Dictionary<string, Document> ListDocumentSamples = new Dictionary<string, Document>
        {
            {"Disk", new Disk()},
            {"Book", new Book()}
        };
        public static Document CreateDocument(string type)
        {

            if (ListDocumentSamples.ContainsKey(type))
                return ListDocumentSamples[type].Clone();
            return null;
        }
    }
}
