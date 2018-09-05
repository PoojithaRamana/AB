using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AddressBookModels
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public long? MobileNumber { get; set; }
        public long? LandLineNumber { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
    }
}
