using Abp;
using Abp.Application.Services;
using Abp.Notifications;
using AppointmentApp.Notification.NotificationDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Notification
{
    public class NotificationPublishAppService : ApplicationService, INotificationPublishAppService
    {
        private readonly INotificationPublisher _notiticationPublisher;

        public NotificationPublishAppService(INotificationPublisher notiticationPublisher)
        {
            _notiticationPublisher = notiticationPublisher;
        }

        public async Task Publish_Message(string senderName, string Message, long targetUserId)
        {            
            UserIdentifier targetUserIdentifier = new UserIdentifier(null, targetUserId);
            await _notiticationPublisher.PublishAsync("Message", new AppMessageNotificationData(senderName, Message), userIds: new[] { targetUserIdentifier });
        }
    }
}
