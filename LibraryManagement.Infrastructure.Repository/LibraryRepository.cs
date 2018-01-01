using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Models;
using LibraryManagement.Shared;

namespace LibraryManagement.Infrastructure.Repository
{
    public class LibraryRepository:ILibraryRepository
    {
        public async Task<List<Document>> GetAllDocumentsAsync()
        {
            var listDocuments = new List<Document>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_GetAll", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>();
                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var name = (string) dataReader["Name"];
                    var description = (string) dataReader["Description"];
                    var author = (string) dataReader["Author"];
                    var price = (decimal) dataReader["Price"];
                    var quantity = (int) dataReader["Quantity"];
                    var group = (string) dataReader["Group"];
                    var type = (string) dataReader["Type"];
                    var uploadedBy = (string) dataReader["UploadedBy"];
                    var document =
                        LibraryFactory.CreateDocument(type, name, description, author, price, quantity, group,
                            uploadedBy);
                    listDocuments.Add(document);
                }
                return listDocuments;
            }
        }

        public async Task<bool> AddDocumentAsync(Document document, Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_Add", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Name", document.Name},
                    {"Description", document.Description},
                    {"Author", document.Author},
                    {"Price", document.Price},
                    {"Quantity", document.Quantity},
                    {"Group", document.Group.ToString()},
                    {"Type", document.GetDocumentType()},
                    {"UploadedBy", userId }
                };
                var rowEffect = await db.ExecuteNonQueryAsync(listParams);
                return rowEffect > 0;
            }
        }

        public async Task<bool> BorrowDocumentAsync(Guid id, Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_Borrow", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Id", id}
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }
    }
}
