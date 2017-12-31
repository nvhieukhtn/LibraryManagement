using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public abstract class Document
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Handle { get; set; }
        private static int _currenctHandle = 1;

        protected Document()
        {
            Handle = _currenctHandle++;
        }

        public abstract Document Clone();
    }
}
