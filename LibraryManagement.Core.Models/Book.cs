using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Book:Document
    {
        public List<string> Authors { get; set; }
        public decimal Price { get; set; }
        public override Document Clone()
        {
            var listAuthors = new List<string>(Authors);
            var book =  new Book
            {
                Authors = listAuthors,
                Price = Price,
                Name = Name,
                Description = Description
            };
            return book;
        }
    }
}
