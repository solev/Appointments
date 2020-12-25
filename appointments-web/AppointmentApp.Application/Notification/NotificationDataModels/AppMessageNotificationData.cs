using Abp.Extensions;
using Abp.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Notification.NotificationDataModels
{
    public class AppMessageNotificationData : NotificationData
    {
        public string SenderName { get; set; }
        public string Message { get; set; }

        public string ShortMessage
        {
            get
            {
                return string.Format("{0}...", Message.Truncate(20));
            }
            set { }
        }

        public AppMessageNotificationData(string senderName, string message)
        {
            SenderName = senderName;
            Message = message;
        }
    }
}
