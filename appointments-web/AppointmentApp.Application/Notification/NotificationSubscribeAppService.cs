using Abp;
using Abp.Application.Services;
using Abp.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Notification
{
    public class NotificationSubscribeAppService : ApplicationService, INotificationSubscribeAppService
    {
        private readonly INotificationSubscriptionManager _notificationSubscriptionManager;

        public NotificationSubscribeAppService(INotificationSubscriptionManager notificationSubscriptionManager)
        {
            _notificationSubscriptionManager = notificationSubscriptionManager;
        }

        public async Task Subscribe_Message(long userId)
        {
            await _notificationSubscriptionManager.SubscribeAsync(new UserIdentifier(null, userId), "Message");
        }

    }
}
