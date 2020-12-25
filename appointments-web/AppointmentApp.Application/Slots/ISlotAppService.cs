using Abp.Application.Services;
using AppointmentApp.Slots.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Slots
{
    public interface ISlotAppService : IAsyncCrudAppService<SlotDto, int, GetSlotsInput>
    {        
    }
}
