using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Book:Document
    {
        public override BaseModel Clone()
        {
            var book =  new Book
            {
                Author = Author,
                Price = Price,
                Name = Name,
                Description = Description,
                Quantity = Quantity,
                Id = Id,
                AvailableQuantity =  AvailableQuantity,
                Group =  Group,
            };
            return book;
        }

        public override string GetDocumentType()
        {
            return "Book";
        }
    }
}
