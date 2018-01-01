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
        public static Document CreateDocument(string type, string group)
        {

            if (ListDocumentSamples.ContainsKey(type))
            {
                var document = ListDocumentSamples[type].Clone();
                Enum.TryParse<DocumentGroup>(group, out var groupEnum);
                document.Group = groupEnum;
                return document;
            }
            return null;
        }
        public static Document CreateDocument(string type, string name, string description
            , string author, decimal price, int quantity, string group)
        {

            if (ListDocumentSamples.ContainsKey(type))
            {
                var document = ListDocumentSamples[type].Clone();
                document.Description = description;
                document.Name = name;
                document.Author = author;
                document.Price = price;
                document.Quantity = quantity;
                Enum.TryParse<DocumentGroup>(group, out var groupEnum);
                document.Group = groupEnum;
                return document;
            }
            return null;
        }
    }
}
