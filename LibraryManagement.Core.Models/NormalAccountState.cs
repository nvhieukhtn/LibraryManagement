using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class NormalAccountState:BaseAccountState
    {
        public override decimal GetAnnualFees()
        {
            return 50.00M;
        }

        public override int MaxBooks()
        {
            return 3;
        }
    }
}
