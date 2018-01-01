using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Api.Models;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Models;
using Unity;

namespace Api.Controllers
{
    [RoutePrefix("Library")]
    public class LibraryController : ApiController
    {
        private readonly ILibraryService _libraryService;
        private readonly IUnityContainer _container = DependencyResolution.Container;

        public LibraryController()
        {
            _libraryService = _container.Resolve<ILibraryService>();
        }

        [Route("Add")]
        [HttpPost]
        public async Task<IHttpActionResult> AddDocumentAsync([FromBody] DocumentViewModel document)
        {
            var permission = Permission.GetPermission(Request.Headers);
            var documentModel = LibraryFactory.CreateDocument(document.Type, document.Name, document.Description,
                document.Author, document.Price, document.Quantity, document.Group);
            var succeed = await _libraryService.AddDocumentAsync(documentModel, permission.AccountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }
        [Route("Borrow/{documentId}")]
        [HttpPost]
        public async Task<IHttpActionResult> BorrowAsync(Guid documentId)
        {
            var permission = Permission.GetPermission(Request.Headers);
            var succeed = await _libraryService.BorrowDocumentAsync(documentId, permission.AccountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }

        [Route("Return/{documentId}")]
        [HttpPost]
        public async Task<IHttpActionResult> ReturnAsync(Guid documentId)
        {
            var permission = Permission.GetPermission(Request.Headers);
            var succeed = await _libraryService.ReturnDocumentAsync(documentId, permission.AccountToken);
            if (succeed)
                return Ok();
            return BadRequest();
        }
        [Route("List")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllDocumentsAsync()
        {
            var listBooks = await _libraryService.GetAllDocumentsAsync();
            var listViewBooks = listBooks.Select(book => new DocumentViewModel(book));
            return Ok<IEnumerable<DocumentViewModel>>(listViewBooks);
        }

        [Route("Update")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdateDocumentInformationAsync([FromBody] DocumentViewModel document)
        {
            await Task.Delay(1000);
            return Ok();
        }
    }
}
