using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Slots.Dto
{
    [AutoMap(typeof(Slot))]
    public class SlotDto : EntityDto
    {
        public int AdviserId { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }

        public string FormattedDate
        {
            get
            {
                return Date.ToString();
            }
            set { }
        }
    }
}
