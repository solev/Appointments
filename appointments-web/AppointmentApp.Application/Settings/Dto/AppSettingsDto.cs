using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Settings.Dto
{
    public class AppSettingsDto
    {
        [Range(1, int.MaxValue)]
        public int HoldTime { get; set; }

        [Range(1, int.MaxValue)]
        public int MaxHoldTime { get; set; }

        [Range(1, int.MaxValue)]
        public int DaysInAdvance { get; set; }

        public string AvailableColor { get; set; }
        public string WitheldColor { get; set; }
        public string BookedColor { get; set; }
        public string NotAvailableColor { get; set; }
    }
}
