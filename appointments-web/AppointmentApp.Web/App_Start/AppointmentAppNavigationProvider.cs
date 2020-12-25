using Abp.Application.Navigation;
using Abp.Localization;
using AppointmentApp.Authorization;

namespace AppointmentApp.Web
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses ABP's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See .cshtml and .js files under App/Main/views/layout/header to know how to render menu.
    /// </summary>
    public class AppointmentAppNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {

            context.Manager.MainMenu
               .AddItem(
                    new MenuItemDefinition(
                        "Users",
                        L("Users"),
                        url: "#users",
                        icon: "fa fa-users",
                        requiredPermissionName: PermissionNames.Pages_Users
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "Advisers",
                        L("Advisers"),
                        url: "#advisers",
                        icon: "fa fa-suitcase"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "Settings",
                        L("Settings"),
                        url: "#settings",
                        icon: "fa fa-cog"
                        )
                );

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AppointmentAppConsts.LocalizationSourceName);
        }
    }
}
