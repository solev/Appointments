using Abp.Application.Services;
using AppointmentApp.Slots.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.UI;

namespace AppointmentApp.Slots
{
    [AbpAuthorize]
    public class SlotAppService : AsyncCrudAppService<Slot, SlotDto, int, GetSlotsInput>, ISlotAppService
    {
        public SlotAppService(IRepository<Slot, int> repository) : base(repository)
        {
        }

        public override Task<SlotDto> Create(SlotDto input)
        {
            var slot = Repository.GetAll().Where(x => x.Date == input.Date).FirstOrDefault();
            if(slot != null)
            {
                throw new UserFriendlyException("Cannot create slots with same date and time!");
            }

            return base.Create(input);
        }

        protected override IQueryable<Slot> CreateFilteredQuery(GetSlotsInput input)
        {
            var query = base.CreateFilteredQuery(input);
            
            if (input.StartDate.HasValue)
            {
                //input.StartDate = DateTime.Parse(input.StartDate.Value.ToShortDateString() + " 09:00");
                query = query.Where(x => input.StartDate.Value <= x.Date);
            }

            if (input.EndDate.HasValue)
            {
                //input.EndDate = DateTime.Parse(input.EndDate.Value.ToShortDateString() + " 23:50");
                query = query.Where(x => x.Date <= input.EndDate.Value);
            }

            if (input.AdviserId.HasValue)
            {
                query = query.Where(x => x.AdviserId == input.AdviserId.Value);
            }    
            else if (input.AdviserIds.Any())
            {
                query = query.Where(x => input.AdviserIds.Contains(x.AdviserId));
            }
            
            return query;
        }


    }
}
