using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryManagement.Core.Models;

namespace Api.Models
{
    public class DocumentViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public DocumentViewModel(Document book)
        {
            Name = book.Name;
            Description = book.Description;
        }
    }
}