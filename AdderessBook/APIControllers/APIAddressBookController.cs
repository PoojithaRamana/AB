using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AddressBookModels;
using AddressBook;
using System.Web.Http;
using AddressBookServices;

namespace AddressBook.Controllers
{
    public class APIAddressBookController : ApiController
    {
        //public IAddressBook AddressBookAB { get; }
        //public APIAddressBookController(IAddressBook addressBook)
        //{
        //    this.AddressBookAB = addressBook;
        //}
        public IList<Contact> GetContacts()
        {
            return MvcApplication.addressBook.GetAllContacts();
        }

        public Contact Get([FromUri]int id)
        {
            return MvcApplication.addressBook.GetContactById(id);           
        }

        public Contact Post([FromBody]Contact contact)
        {
            contact.Id = MvcApplication.addressBook.InsertContact(contact);
            return contact;       
        }
         
        public Contact Put([FromBody]Contact contact)
        {
            contact.Id = MvcApplication.addressBook.UpdateContact(contact);
            return contact;
        } 
        
        public void Delete([FromUri]int id)
        {
            MvcApplication.addressBook.DeleteContact(id);        
        }
    }
}