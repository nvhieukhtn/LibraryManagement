using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Api.App_Start;
using Api.Models;
using LibraryManagement.Shared;

namespace Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected async void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            DependencyResolution.Start();
            ApplicationSetting.Load();
            await DataCached.LoadAsync();
        }
    }
}
