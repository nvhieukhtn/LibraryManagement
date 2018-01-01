using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryManagement.Core.Models;

namespace Api.Models
{
    public class DocumentViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Group { get; set; }

        public DocumentViewModel()
        {
            
        }

        public DocumentViewModel(LibraryManagement.Core.Models.Document book)
        {
            Name = book.Name;
            Description = book.Description;
            Id = book.Id;
            Quantity = book.Quantity;
            Group = book.Group.ToString();
            Author = book.Author;
            Price = book.Price;
            Type = book.GetDocumentType();
        }
    }
}