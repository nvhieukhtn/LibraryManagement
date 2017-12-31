using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Api.Models;
using LibraryManagement.Core.Interface.Service;
using Unity;

namespace Api.App_Start
{
    public class DataCached
    {
        
        private static readonly IUnityContainer _container = DependencyResolution.Container;
        private static readonly IChanelService _chanelService = _container.Resolve<IChanelService>();

       
        public static async Task LoadAsync()
        {
            await _chanelService.LoadCachedAsync();
        }
    }
}