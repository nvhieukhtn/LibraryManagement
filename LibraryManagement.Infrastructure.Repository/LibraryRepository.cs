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
                    var document =
                        LibraryFactory.CreateDocument(type, name, description, author, price, quantity, group);
                    listDocuments.Add(document);
                }
                return listDocuments;
            }
        }
    }
}
