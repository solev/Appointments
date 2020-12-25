using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Abp.Dependency;
using System.Threading.Tasks;
using Abp.Runtime.Session;
using AppointmentApp.Notification.NotificationDataModels;
using AppointmentApp.Slots.Dto;

namespace AppointmentApp.Web.Hubs
{
    public class AppointmentHub : Hub, ITransientDependency
    {
        private readonly IAbpSession _AbpSession;

        public AppointmentHub(IAbpSession AbpSession)
        {
            _AbpSession = AbpSession;
        }

        public override Task OnConnected()
        {
            var userId = _AbpSession.GetUserId();
            Groups.Add(Context.ConnectionId, userId.ToString());
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var userId = _AbpSession.GetUserId();
            Groups.Remove(Context.ConnectionId, userId.ToString());
            return base.OnDisconnected(stopCalled);
        }        

        public void Hello()
        {
            Clients.All.hello();
        }

        public static void Static_Hello()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<AppointmentHub>();
            context.Clients.All.Hello();
        }

        public void Message(long recieverId, string senderName, string content)
        {
            AppMessageNotificationData appMessageData = new AppMessageNotificationData(senderName, content);
            Clients.Group(recieverId.ToString()).appMessage(appMessageData);
        }        

        public static void Static_Message(long recieverId, string senderName, string content)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<AppointmentHub>();
            AppMessageNotificationData appMessageData = new AppMessageNotificationData(senderName, content);

            context.Clients.Group(recieverId.ToString()).appMessage(appMessageData);
        }

        void SlotChanged(SlotDto slot)
        {
            Clients.All.slotChanged(slot);
        }

        public static void Static_SlotChanged(SlotDto slot)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<AppointmentHub>();
            context.Clients.All.slotChanged(slot);
        }

    }
}