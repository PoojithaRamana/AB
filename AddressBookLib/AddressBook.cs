using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AddressBookModels;
using PetaPoco;

namespace AddressBookServices
{
    public class AddressBook : IAddressBook
    {
        public Database DB { get; set; }
        public AddressBook(Database db)
        {
            this.DB = db;
        }

        public IList<Contact> GetAllContacts()
        {
            IList<DbContact.Contact> contactsDB = this.DB.Fetch<DbContact.Contact>("");
            return AutoMapper.mapper.Map<IList<DbContact.Contact>, IList<Contact>>(contactsDB);
        }

        public Contact GetContactById(int id)
        {
            DbContact.Contact contact = this.DB.SingleOrDefault<DbContact.Contact>("select * from Contact where Id = @0", id);
            return AutoMapper.mapper.Map<DbContact.Contact, Contact>(contact);
        }

        public int InsertContact(Contact contact)
        {
            DbContact.Contact contactDB = new DbContact.Contact();
            contactDB = AutoMapper.mapper.Map<Contact, DbContact.Contact>(contact);
            this.DB.Insert(contact);
            return contact.Id;
        }

        public int UpdateContact(Contact contact)
        {
            DbContact.Contact contactDB = new DbContact.Contact();
            contactDB = AutoMapper.mapper.Map<Contact, DbContact.Contact>(contact);
            this.DB.Update(contact);
            return contact.Id;
        }

        public void DeleteContact(int id)
        {
            this.DB.Delete<DbContact.Contact>("WHERE ID = @0", id);
        }
    }
}
