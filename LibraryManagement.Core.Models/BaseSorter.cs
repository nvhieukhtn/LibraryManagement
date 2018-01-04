using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class BaseSorter <T> where T : BaseModel
    {
        protected virtual bool NeedSwap(T source, T dest)
        {
            return false;
        }

        protected virtual void Swap(T source, T dest)
        {
            var temp = source.Clone();
            source.CopyData(dest);
            dest.CopyData(temp);
        }

        public List<T> Sort(List<T> listData)
        {
            for (var i = 0;i < listData.Count - 1;i++)
                for(var j = i + 1; j < listData.Count; j++)
                    if(NeedSwap(listData[i], listData[j]))
                        Swap(listData[i], listData[j]);
            return listData;
        }
    }
}
