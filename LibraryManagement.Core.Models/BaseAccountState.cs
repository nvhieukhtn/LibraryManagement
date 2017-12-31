using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public abstract class BaseAccountState
    {
        public abstract decimal GetAnnualFees();
        public abstract int MaxBooks();
    }
}
