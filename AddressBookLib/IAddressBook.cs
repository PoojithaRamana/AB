using AddressBookModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AddressBookServices
{
    public interface IAddressBook
    {
        Contact GetContactById(int id);
        IList<Contact> GetAllContacts();
        int InsertContact(Contact contact);
        int UpdateContact(Contact contact);
        void DeleteContact(int id);
    }
}
