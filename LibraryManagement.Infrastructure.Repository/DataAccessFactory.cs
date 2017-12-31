using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.DataAccess;
using LibraryManagement.Shared;

namespace LibraryManagement.Infrastructure.Repository
{
    public class DataAccessFactory
    {
        public static IDataAccess CreateDataAccess(string storeProcedure, DatabaseType type)
        {
            switch (type)
            {
                case DatabaseType.Read:
                    return new SqlDataAccess(storeProcedure);
                case DatabaseType.Write:
                    return new SqlDataAccess(storeProcedure);
            }
            return null;
        }
    }
}
