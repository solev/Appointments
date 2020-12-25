using Abp.Domain.Entities.Auditing;
using AppointmentApp.Slots;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Advisers
{
    public class Adviser : FullAuditedEntity<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }

        public virtual ICollection<Slot> Slots { get; set; }
    }
}
