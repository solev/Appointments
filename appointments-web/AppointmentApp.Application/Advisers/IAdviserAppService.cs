using Abp.Application.Services;
using AppointmentApp.Advisers.Dto;
using AppointmentApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Advisers
{
    public interface IAdviserAppService : IAsyncCrudAppService<AdviserDto, int, SearchedPagedAndSortedResultRequestDto>
    {
        GetWithSlotsOutput GetWithSlots(AdviserDto input);
    }
}
