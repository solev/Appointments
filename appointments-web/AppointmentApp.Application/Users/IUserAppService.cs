using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AppointmentApp.Users.Dto;
using AppointmentApp.Dto;

namespace AppointmentApp.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserListDto, long, SearchedPagedAndSortedResultRequestDto>
    {
        Task ProhibitPermission(ProhibitPermissionInput input);

        Task RemoveFromRole(long userId, string roleName);

        Task<ListResultDto<UserListDto>> GetUsers();

        Task CreateUser(CreateUserInput input);
    }
}