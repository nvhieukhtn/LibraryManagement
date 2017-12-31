using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Shared;

namespace LibraryManagement.Infrastructure.Repository
{
    public class SqlDataAccess : DataAccess
    {
        private SqlConnection Connection { get; }
        public SqlDataAccess(string storeProcedure) : base(storeProcedure)
        {
            var connectionString = ApplicationSetting.ConnectionString;
            Connection = new SqlConnection(connectionString);
            Connection.Open();
        }

        public override void Dispose()
        {
            Connection.Close();
        }

        public override async Task<int> ExecuteNonQueryAsync(Dictionary<string, object> listParams)
        {
            using (var command = new SqlCommand())
            {
                command.Connection = Connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = StoreProcedure;
                foreach (var param in listParams)
                {
                    command.Parameters.AddWithValue(param.Key, param.Value);
                }
                var result = await command.ExecuteNonQueryAsync();
                return result;
            }
        }

        public override async Task<object> ExecuteScalarAsync(Dictionary<string, object> listParams)
        {
            using (var command = new SqlCommand())
            {
                command.Connection = Connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = StoreProcedure;
                foreach (var param in listParams)
                {
                    command.Parameters.AddWithValue(param.Key, param.Value);
                }
                var result = await command.ExecuteScalarAsync();
                return result;
            }
        }

        public override async Task<IDataReader> ExecuteReaderAsync(Dictionary<string, object> listParams)
        {
            using (var command = new SqlCommand())
            {
                command.Connection = Connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = StoreProcedure;
                foreach (var param in listParams)
                {
                    command.Parameters.AddWithValue(param.Key, param.Value);
                }
                var result = await command.ExecuteReaderAsync();
                return result;
            }
        }
    }
}
