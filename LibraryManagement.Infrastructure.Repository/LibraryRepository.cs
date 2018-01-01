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
                    var availableQuantity = (int)dataReader["AvailableQuantity"];
                    var group = (string) dataReader["Group"];
                    var type = (string) dataReader["Type"];
                    var uploadedBy = (string) dataReader["UploadedBy"];
                    var document =
                        LibraryFactory.CreateDocument(type, group);
                    var id = (Guid) dataReader["ID"];
                    document.Id = id;
                    document.Author = author;
                    document.Price = price;
                    document.Quantity = quantity;
                    document.AvailableQuantity = availableQuantity;
                    document.UploadedBy = uploadedBy;
                    document.Name = name;
                    document.Description = description;
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

        public async Task<bool> BorrowDocumentAsync(Guid documentId, Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_Borrow", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"DocumentId", documentId},
                    {"UserId", userId }
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }

        public async Task<bool> ReturnDocumentAsync(Guid documentId, Guid userId)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_Return", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"DocumentId", documentId},
                    {"UserId", userId }
                };
                var effectRows = await db.ExecuteNonQueryAsync(listParams);
                return effectRows > 0;
            }
        }

        public async Task<List<BorrowedDocument>> GetListBorrowedDocumentsAsync(Guid userId)
        {
            var listDocuments = new List<BorrowedDocument>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_GetBorrowedDocuments", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId}
                };
                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var name = (string)dataReader["Name"];
                    var description = (string)dataReader["Description"];
                    var author = (string)dataReader["Author"];
                    
                    var borrowedOn = (DateTime) dataReader["BorrowedOn"];
                    var returnOn = (DateTime) dataReader["ReturnOn"];
                    var document = new BorrowedDocument
                    {
                        Author = author,
                        Name = name,
                        Description = description,
                        BorrowedOn = borrowedOn,
                        ReturnOn = returnOn
                    };
                    listDocuments.Add(document);
                }
                return listDocuments;
            }
        }

        public async Task<List<BorrowedDocument>> GetListBorrowingDocumentsAsync(Guid userId)
        {
            var listDocuments = new List<BorrowedDocument>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Document_GetBorrowingDocuments", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId}
                };
                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var name = (string)dataReader["Name"];
                    var description = (string)dataReader["Description"];
                    var author = (string)dataReader["Author"];

                    var borrowedOn = (DateTime)dataReader["BorrowedOn"];
                    var document = new BorrowedDocument
                    {
                        Author = author,
                        Name = name,
                        Description = description,
                        BorrowedOn = borrowedOn
                    };
                    listDocuments.Add(document);
                }
                return listDocuments;
            }
        }
    }
}
