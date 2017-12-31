using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Api.Models;
using LibraryManagement.Core.Interface.Service;
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
        [Route("Borrow/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> BorrowAsync(Guid id)
        {
            await Task.Delay(1000);
            return Ok();
        }

        [Route("Return/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> ReturnAsync(Guid id)
        {
            await Task.Delay(1000);
            return Ok();
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
