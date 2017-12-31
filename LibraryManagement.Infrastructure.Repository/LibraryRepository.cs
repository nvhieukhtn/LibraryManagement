using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Infrastructure.Repository
{
    public class LibraryRepository:ILibraryRepository
    {
        public Task<List<Document>> GetAllDocumentsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
