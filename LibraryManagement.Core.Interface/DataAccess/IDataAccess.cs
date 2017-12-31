using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Interface.DataAccess
{
    public interface IDataAccess:IDisposable
    {
        Task<int> ExecuteNonQueryAsync(Dictionary<string, object> listParams);
        Task<object> ExecuteScalarAsync(Dictionary<string, object> listParams);
        Task<IDataReader> ExecuteReaderAsync(Dictionary<string, object> listParams);
    }
}
