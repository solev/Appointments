using Abp.Web.Mvc.Views;

namespace AppointmentApp.Web.Views
{
    public abstract class AppointmentAppWebViewPageBase : AppointmentAppWebViewPageBase<dynamic>
    {

    }

    public abstract class AppointmentAppWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected AppointmentAppWebViewPageBase()
        {
            LocalizationSourceName = AppointmentAppConsts.LocalizationSourceName;
        }
    }
}