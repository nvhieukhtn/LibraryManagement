using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class VipAccountState:BaseAccountState
    {
        public override decimal GetAnnualFees()
        {
            return 0M;
        }

        public override int MaxBooks()
        {
            return 10;
        }
    }
}
