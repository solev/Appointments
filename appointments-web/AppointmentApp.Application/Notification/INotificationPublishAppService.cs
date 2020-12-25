using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Notification
{
    public interface INotificationPublishAppService : IApplicationService
    {
        Task Publish_Message(string senderName, string Message, long targetUserId);
    }
}
