using AppointmentApp.Slots.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Advisers.Dto
{
    public class GetWithSlotsOutput
    {
        public AdviserDto Adviser { get; set; }
        public List<SlotDto> Slots { get; set; }
    }
}
