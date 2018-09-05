using AddressBookModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBookServices
{
    public static class AutoMapper
    {
        public static MapperConfiguration config = new MapperConfiguration(cfg =>{
            cfg.CreateMap<Contact, DbContact.Contact>();
        });
        public static readonly IMapper mapper = config.CreateMapper();
    }
}
