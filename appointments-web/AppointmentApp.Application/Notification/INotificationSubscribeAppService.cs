using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Notification
{
    public interface INotificationSubscribeAppService : IApplicationService
    {
        Task Subscribe_Message(long userId);
    }
}
