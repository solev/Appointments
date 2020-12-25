using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Messages.Dto
{
    [AutoMap(typeof(Message))]
    public class MessageDto : EntityDto
    {
        public long RecieverId { get; set; }
        public long SenderId { get; set; }
        public string SenderFullName { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreationTime { get; set; }

        public string CreatedTime
        {
            get
            {
                return CreationTime != null ? string.Format("{0} {1}", CreationTime.ToShortDateString(), CreationTime.ToShortTimeString()) : null;
            }
        }

        public string ShortMessage
        {
            get
            {
                return Content != null ? Content.Length > 35 ? Content.Truncate(35)+"..." : Content : null;
            }
        }
    }
}
