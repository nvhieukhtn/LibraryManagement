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
        private readonly IAuthenticationService _authenticationService;
        private readonly IChanelService _chanelService;
        public LibraryService(ILibraryRepository libraryRepository, 
            IAuthenticationService authenticationService, IChanelService chanelService)
        {
            _libraryRepository = libraryRepository;
            _authenticationService = authenticationService;
            _chanelService = chanelService;
        }

        public async Task<List<Document>> GetAllDocumentsAsync()
        {
            var listDocuments = await _libraryRepository.GetAllDocumentsAsync();
            return listDocuments;
        }

        public Task<bool> UpdateDocumentInformationAsync(Document document)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddDocumentAsync(Document document, string accountToken)
        {
            var account = await _authenticationService.GetAccountInformationAsync(accountToken);
            var succeed = await _libraryRepository.AddDocumentAsync(document, account.Id);
            if (succeed)
            {
                var notification = new Notification
                {
                    Title = "We have just had a new document in " + document.Group.ToString(),
                    Content = document.Name
                };
                succeed &= await _chanelService.NotifyAllsAsync(document.Group.ToString(), notification);
            }
            return succeed;
        }

        public async Task<bool> BorrowDocumentAsync(Guid id, string accountToken)
        {
            var account = await _authenticationService.GetAccountInformationAsync(accountToken);
            var succeed = await _libraryRepository.BorrowDocumentAsync(id, account.Id);
            return succeed;
        }
    }
}
