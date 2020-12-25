using Abp.Application.Services;
using AppointmentApp.Messages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services.Dto;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using Abp.Authorization;

namespace AppointmentApp.Messages
{
    [AbpAuthorize]
    public class MessageAppService : AsyncCrudAppService<Message, MessageDto, int, PagedAndSortedResultRequestDto, CreateMessageInput>, IMessageAppService
    {
        private readonly IAbpSession _session;

        public MessageAppService(IRepository<Message, int> repository, IAbpSession session) : base(repository)
        {
            _session = session;              
        }

        public void MarkAsRead(MessageDto input)
        {
            var message = Repository.Get(input.Id);
            message.IsRead = true;
        }

        protected override IQueryable<Message> CreateFilteredQuery(PagedAndSortedResultRequestDto input)
        {
            long currentUserId = _session.GetUserId();
            return base.CreateFilteredQuery(input).Where(x => x.RecieverId == currentUserId).OrderByDescending(x => x.CreationTime);
        }
    }
}
