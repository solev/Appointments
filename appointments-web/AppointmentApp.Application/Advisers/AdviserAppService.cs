using Abp.Application.Services;
using AppointmentApp.Advisers.Dto;
using AppointmentApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Timing;
using Abp.Authorization;

namespace AppointmentApp.Advisers
{
    [AbpAuthorize]
    public class AdviserAppService : AsyncCrudAppService<Adviser, AdviserDto, int, SearchedPagedAndSortedResultRequestDto>, IAdviserAppService
    {
        private readonly IRepository<Adviser, int> _repository;
        public AdviserAppService(IRepository<Adviser, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public GetWithSlotsOutput GetWithSlots(AdviserDto input)
        {

            DateTime today = Clock.Now.Date, endDate = Clock.Now.AddDays(7).Date;

            var adviser = _repository.GetAll().Where(x => x.Id == input.Id).Select(x => new
            {
                x.Id,
                x.FirstName,
                x.LastName,
                x.CompanyName,
                x.PhoneNumber,
                Slots = x.Slots.Where(t => today <= t.Date && t.Date <= endDate).Select(t => new
                {
                    t.Id,
                    t.Date,
                    t.Status
                })
            }).FirstOrDefault();

            GetWithSlotsOutput output = new GetWithSlotsOutput();

            if (adviser!= null)
            {
                output.Adviser = new AdviserDto
                {
                    Id= adviser.Id,
                    FirstName = adviser.FirstName,
                    LastName = adviser.LastName,
                    CompanyName = adviser.CompanyName,
                    PhoneNumber = adviser.PhoneNumber
                };

                output.Slots = adviser.Slots.Select(x => new Slots.Dto.SlotDto
                {
                    Id = x.Id,
                    Date = x.Date,
                    Status = x.Status
                }).ToList();

            }           
          

            return output;
        }

    }
}
