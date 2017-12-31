using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Core.Models
{
    public class Chanels:BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<AccountModel> ListSubscribers { get; set; }

        public Chanels()
        {
            ListSubscribers = new List<AccountModel>();
        }
        public Chanels(string name, string description)
        {
            Name = name;
            Description = description;
            ListSubscribers = new List<AccountModel>();
        }

        public void Follow(AccountModel subcriber)
        {
            ListSubscribers.Add(subcriber);
        }
    }
}
