using Abp.Domain.Entities.Auditing;
using AppointmentApp.Advisers;
using AppointmentApp.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Slots
{
    public class Slot : FullAuditedEntity
    {
        public DateTime Date { get; set; }

        public int AdviserId { get; set; }
        public virtual Adviser Adviser { get; set; }

        public long? UserId { get; set; }
        public virtual User User { get; set; }

        public int Status { get; set; }
    }
}
