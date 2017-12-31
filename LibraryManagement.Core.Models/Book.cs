using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Book:Document
    {
        public override Document Clone()
        {
            var book =  new Book
            {
                Author = Author,
                Price = Price,
                Name = Name,
                Description = Description
            };
            return book;
        }
    }
}
