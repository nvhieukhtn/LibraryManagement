using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Models;

namespace LibraryManagement.Core.Interface.Repository
{
    public interface ILibraryRepository
    {
        Task<List<Document>> GetDocumentsAsync(string type);
        Task<bool> AddDocumentAsync(Document document, Guid userId);
        Task<bool> BorrowDocumentAsync(Guid id, Guid userId);
        Task<bool> ReturnDocumentAsync(Guid documentId, Guid userId);
        Task<List<BorrowedDocument>> GetListBorrowedDocumentsAsync(Guid userId);
        Task<List<BorrowedDocument>> GetListBorrowingDocumentsAsync(Guid userId);
        Task<List<BorrowedDocument>> GetListRecentBorrowedDocumentsAsync();
    }
}
