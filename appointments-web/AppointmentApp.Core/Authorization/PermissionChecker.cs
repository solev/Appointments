using Abp.Authorization;
using AppointmentApp.Authorization.Roles;
using AppointmentApp.MultiTenancy;
using AppointmentApp.Users;

namespace AppointmentApp.Authorization
{
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
