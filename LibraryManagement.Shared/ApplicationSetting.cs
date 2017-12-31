using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Shared
{
    public static class ApplicationSetting
    {
        public static string ConnectionString { get; private set; }

        public static void Load()
        {
            ConnectionString = ConfigurationManager.ConnectionStrings["PrimaryDatabase"].ConnectionString;
        }
    }
}
