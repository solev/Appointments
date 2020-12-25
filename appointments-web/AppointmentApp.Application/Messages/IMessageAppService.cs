using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AppointmentApp.Messages.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Messages
{
    public interface IMessageAppService : IAsyncCrudAppService<MessageDto, int, PagedAndSortedResultRequestDto, CreateMessageInput>
    {
        void MarkAsRead(MessageDto input);
    }
}
