using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Models;
using LibraryManagement.Shared;

namespace LibraryManagement.Infrastructure.Repository
{
    public class ChanelRepository:IChanelRepository
    {
        public async Task<List<Chanels>> LoadAllChanelsAsync()
        {
            var listChanels = new List<Chanels>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Chanel_GetAll", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>();

                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var chanel = new Chanels
                    {
                        Id = (Guid) dataReader["Id"],
                        Name = (string) dataReader["Name"],
                        Description = (string) dataReader["Description"],
                        NumberOfSubscribes =  (int) dataReader["NumberOfSubscribes"]
                    };
                    listChanels.Add(chanel);
                }
                return listChanels;
            }
        }

        public async Task<bool> NotifyAsync(Guid userId, Notification notification)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Notification_Notify", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId},
                    {"Title", notification.Title},
                    {"Content", notification.Content}
                };
                var succeed = await db.ExecuteNonQueryAsync(listParams);
                return succeed > 0;
            }
        }

        public async Task<List<Notification>> GetAllNotificationsAsync(Guid userId)
        {
            var listNotifications = new List<Notification>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Notification_GetAllNotifications", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId}
                };
                var reader = await db.ExecuteReaderAsync(listParams);
                while (reader.Read())
                {
                    var notification = new Notification
                    {
                        Title = (string) reader["Title"],
                        Content = (string) reader["Content"],
                        IsRead = (bool) reader["IsRead"]
                    };
                    listNotifications.Add(notification);
                }
                return listNotifications;
            }
        }

        public async Task<bool> CreateNewChanelAsync(Chanels chanel)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Chanel_Add", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"Id", chanel.Id },
                    {"Name", chanel.Name},
                    {"Description", chanel.Description}
                };
                var succeed = await db.ExecuteNonQueryAsync(listParams);
                return succeed > 0;
            }
        }

        public async Task<bool> SubscribeChanelAsync(Guid userId, Chanels chanel)
        {
            using (var db = DataAccessFactory.CreateDataAccess("sp_Chanel_Follow", DatabaseType.Write))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"UserId", userId},
                    {"ChanelId", chanel.Id}
                };
                var succeed = await db.ExecuteNonQueryAsync(listParams);
                return succeed > 0;
            }
        }

        public async Task<Dictionary<string,AccountModel>> GetAllSubcribes(Guid chanelId)
        {
            var listSubscribers = new Dictionary<string, AccountModel>();
            using (var db = DataAccessFactory.CreateDataAccess("sp_Chanel_GetAllSubcribes", DatabaseType.Read))
            {
                var listParams = new Dictionary<string, object>
                {
                    {"ChanelId", chanelId}
                };
                var dataReader = await db.ExecuteReaderAsync(listParams);
                while (dataReader.Read())
                {
                    var subscriber = new AccountModel
                    {
                        Id = (Guid) dataReader["Id"],
                        Username = (string) dataReader["Username"]
                    };
                    listSubscribers.Add(subscriber.Username, subscriber);
                }
                return listSubscribers;
            }
        }
    }
}
