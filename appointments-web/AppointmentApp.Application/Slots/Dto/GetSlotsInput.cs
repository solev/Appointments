using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Slots.Dto
{
    public class GetSlotsInput
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? AdviserId { get; set; }
        public List<int> AdviserIds { get; set; }
    }
}
