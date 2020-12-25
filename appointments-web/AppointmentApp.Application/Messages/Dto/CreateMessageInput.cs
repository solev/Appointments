using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Messages.Dto
{
    [AutoMap(typeof(Message))]
    public class CreateMessageInput : EntityDto
    {
        public long RecieverId { get; set; }
        public long SenderId { get; set; }
        public string Content { get; set; }
    }
}
