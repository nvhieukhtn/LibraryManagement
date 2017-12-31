using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LibraryManagement.Core.Interface.Repository;
using LibraryManagement.Core.Interface.Service;
using LibraryManagement.Core.Service;
using LibraryManagement.Infrastructure.Repository;
using Unity;

namespace Api.Models
{
    public static class DependencyResolution
    {
        private static IUnityContainer _container;

        public static void Start()
        {
            _container = new UnityContainer();
            RegisterType(_container);
        }
        private static void RegisterType(IUnityContainer container)
        {
            container.RegisterType<ILibraryRepository, LibraryRepository>();
            container.RegisterType<ILibraryService, LibraryService>();

            container.RegisterType<IAuthenticationRepository, AuthenticationRepository>();
            container.RegisterType<IAuthenticationService, AuthenticationService>();

            container.RegisterType<IChanelRepository, ChanelRepository>();
            container.RegisterType<IChanelService, ChanelService>();

        }

        public static IUnityContainer Container => _container;
    }
}