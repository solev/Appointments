using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using Microsoft.AspNet.SignalR;
using AppointmentApp.Web.Hubs;
using AppointmentApp.Notification;
using System.Threading.Tasks;
using Abp.Web.SignalR.Hubs;

namespace AppointmentApp.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : AppointmentAppControllerBase
    {
       
        public ActionResult Index()
        {
            //AppointmentHub.Static_Hello();
            //AppointmentHub.Static_Message(2, "System", "Sample Message");

            return View("~/App/Main/views/layout/layout.cshtml"); //Layout of the angular application.
        }
	}
}