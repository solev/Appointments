using Abp.Domain.Entities.Auditing;
using AppointmentApp.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Messages
{
    public class Message : FullAuditedEntity
    {
        public long SenderId { get; set; }        
        public virtual User Sender { get; set; }

        public long RecieverId { get; set; }        
        public virtual User Reciever { get; set; }

        public string Content { get; set; }
        public bool IsRead { get; set; }
    }
}
