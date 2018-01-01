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
        public int NumberOfSubscribes { get; set; }
        public Dictionary<string, AccountModel> ListSubscribers { get; set; }

        public Chanels()
        {
            ListSubscribers = new Dictionary<string, AccountModel>();
        }
        public Chanels(string name, string description)
        {
            Name = name;
            Description = description;
            ListSubscribers = new Dictionary<string, AccountModel>();
        }

        public void Subscribe(AccountModel subscribe)
        {
            ListSubscribers.Add(subscribe.Username, subscribe);
        }

        public bool Unsubscribe(AccountModel subscribe)
        {
            if (ListSubscribers.ContainsKey(subscribe.Username))
            {
                ListSubscribers.Remove(subscribe.Username);
            }
            return false;
        }
    }
}
