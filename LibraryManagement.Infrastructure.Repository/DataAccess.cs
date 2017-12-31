using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.DataAccess;

namespace LibraryManagement.Infrastructure.Repository
{
    public abstract class DataAccess:IDataAccess
    {
        protected string StoreProcedure { get; }

        protected DataAccess(string storeProcedure)
        {
            StoreProcedure = storeProcedure;
        }
        public abstract void Dispose();

        public abstract Task<int> ExecuteNonQueryAsync(Dictionary<string, object> listParams);

        public abstract Task<object> ExecuteScalarAsync(Dictionary<string, object> listParams);

        public abstract Task<IDataReader> ExecuteReaderAsync(Dictionary<string, object> listParams);
    }
}
