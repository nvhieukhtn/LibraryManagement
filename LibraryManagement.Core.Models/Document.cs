using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public abstract class Document:BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public string Author { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string UploadedBy { get; set; }
        public DocumentGroup Group { get; set; }
        public abstract Document Clone();

        public abstract string GetDocumentType();
    }
}
