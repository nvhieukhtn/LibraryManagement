using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Service
{
    public class LibraryService:ILibraryService
    {
        private readonly ILibraryRepository _libraryRepository;

        public LibraryService(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        public Task<List<Document>> GetAllDocumentsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateDocumentInformationAsync(UpdateInformation information)
        {
            throw new NotImplementedException();
        }
    }
}
