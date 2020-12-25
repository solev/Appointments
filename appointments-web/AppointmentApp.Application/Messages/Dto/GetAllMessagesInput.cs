using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Messages.Dto
{
    public class GetAllMessagesInput : PagedAndSortedResultRequestDto
    {
        public long? UserId { get; set; }
    }
}
