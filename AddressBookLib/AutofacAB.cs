using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using PetaPoco;


namespace AddressBookServices
{
    public static class AutofacAB
    {
        public static IAddressBook GetContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<AddressBook>().As<IAddressBook>();
            builder.Register<Database>(c => new Database("DbContact"));
            var container = builder.Build();
            using (var scope = container.BeginLifetimeScope())
            {
                return scope.Resolve<IAddressBook>();
            }
        }
    }
}

