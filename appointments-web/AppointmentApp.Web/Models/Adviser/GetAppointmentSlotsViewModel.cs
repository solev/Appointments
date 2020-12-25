using AppointmentApp.Slots.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppointmentApp.Web.Models.Adviser
{
    public class GetAppointmentSlotsViewModel
    {
        public int AdviserId { get; set; }
        public Dictionary<DateTime, SlotDto> Slots { get; set; }
        public List<string> Times { get; set; }
        public List<DateTime> Dates { get; set; }


        public string AvailableColor { get; set; }
        public string WithheldColor { get; set; }
        public string BookedColor { get; set; }
        public string NotAvailableColor { get; set; }
    }
}