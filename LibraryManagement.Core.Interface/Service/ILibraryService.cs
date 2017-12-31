using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Service
{
    public interface ILibraryService
    {
        Task<List<Document>> GetAllDocumentsAsync();
        Task<bool> UpdateDocumentInformationAsync(UpdateInformation information);
    }
}
