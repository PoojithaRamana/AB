using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AddressBook.Controllers;
using AddressBookServices;
using Autofac;
using PetaPoco;


namespace AddressBook
{
    public static class Autofac
    {
        //public static void GetContainer()
        //{
        //    var builder = new ContainerBuilder();
        //    builder.RegisterType<AddressBookAB>().As<IAddressBook>(); // change name in services: AddressBook => AddressBookAB
        //    builder.Register<Database>(c => new Database("DbContact"));
        //    builder.RegisterType<APIAddressBookController>();
        //    var container = builder.Build();
        //    using (var scope = container.BeginLifetimeScope())
        //    {
        //        scope.Resolve<IAddressBook>();
        //        scope.Resolve<APIAddressBookController>();
        //    }
        //}
    }
}