using System.Threading.Tasks;
using Abp.Application.Services;
using AppointmentApp.Roles.Dto;

namespace AppointmentApp.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
    }
}
