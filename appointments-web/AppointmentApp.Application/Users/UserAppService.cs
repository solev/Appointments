using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using AppointmentApp.Authorization;
using AppointmentApp.Users.Dto;
using Microsoft.AspNet.Identity;
using Abp.Application.Services;
using AppointmentApp.Dto;
using Abp.IdentityFramework;
using System.Linq;
using Abp.Linq.Extensions;

namespace AppointmentApp.Users
{
    /* THIS IS JUST A SAMPLE. */
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : AsyncCrudAppService<User, UserListDto, long, SearchedPagedAndSortedResultRequestDto>, IUserAppService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IPermissionManager _permissionManager;
        public UserManager UserManager { get; set; }

        public UserAppService(IRepository<User, long> userRepository, IPermissionManager permissionManager) : base(userRepository)
        {
            _userRepository = userRepository;
            _permissionManager = permissionManager;
        }

        protected override IQueryable<User> CreateFilteredQuery(SearchedPagedAndSortedResultRequestDto input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!string.IsNullOrEmpty(input.Search), x =>
                    x.UserName.Contains(input.Search) ||
                    x.Name.Contains(input.Search) ||
                    x.Surname.Contains(input.Search) ||
                    x.EmailAddress.Contains(input.Search)
                );
        }        

        public async Task ProhibitPermission(ProhibitPermissionInput input)
        {
            var user = await UserManager.GetUserByIdAsync(input.UserId);
            var permission = _permissionManager.GetPermission(input.PermissionName);

            await UserManager.ProhibitPermissionAsync(user, permission);
        }

        //Example for primitive method parameters.
        public async Task RemoveFromRole(long userId, string roleName)
        {
            var res = await UserManager.RemoveFromRoleAsync(userId, roleName);
            res.CheckErrors();
        }

        public async Task<ListResultDto<UserListDto>> GetUsers()
        {
            var users = await _userRepository.GetAllListAsync();

            return new ListResultDto<UserListDto>(
                users.MapTo<List<UserListDto>>()
                );
        }

        public async Task CreateUser(CreateUserInput input)
        {
            var user = input.MapTo<User>();

            user.TenantId = AbpSession.TenantId;
            user.Password = new PasswordHasher().HashPassword(input.Password);
            user.IsEmailConfirmed = true;

            var idRes = await UserManager.CreateAsync(user);
            idRes.CheckErrors();
        }
    }
}