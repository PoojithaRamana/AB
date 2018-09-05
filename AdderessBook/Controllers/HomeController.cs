using System.Web.Mvc;
using System.Collections.Generic;
using System;
using AddressBookModels;
using AddressBookServices;
using Autofac;

namespace AddressBook.Controllers
{
    public class HomeController : Controller
    {        
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult ContactForm()
        {         
            return PartialView();
        }
        
        public PartialViewResult DisplayContacts()
        {
            return PartialView();           
        }

        public PartialViewResult ViewDetailsOfContact()
        {
            return PartialView();
        }
    }
}