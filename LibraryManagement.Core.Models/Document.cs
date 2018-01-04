using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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
        public int AvailableQuantity { get; set; }
        public DocumentGroup Group { get; set; }
        public abstract override BaseModel Clone();

        public abstract string GetDocumentType();
        public override void CopyData(BaseModel model)
        {
            var document = (Document) model;
            if (document == null)
                return;
            Id = document.Id;
            Name = document.Name;
            Description = document.Description;
            Author = document.Author;
            Price = document.Price;
            Quantity = document.Quantity;
            UploadedBy = document.UploadedBy;
            AvailableQuantity = document.AvailableQuantity;
            Group = document.Group;
        }
    }
}
