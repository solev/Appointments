using Abp.Authorization.Users;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.UI;
using Abp.Web.Models;
using Abp.WebApi.Controllers;
using AppointmentApp.Api.Models;
using AppointmentApp.Authorization;
using AppointmentApp.Authorization.Roles;
using AppointmentApp.MultiTenancy;
using AppointmentApp.Notification;
using AppointmentApp.Users;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Infrastructure;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Api.Controllers
{
    public class RegisterController : AbpApiController
    {
        
        private readonly TenantManager _tenantManager;
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly LogInManager _logInManager;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly INotificationSubscribeAppService _notificationSubscribeService;
        
        public RegisterController(LogInManager logInManager, TenantManager tenantManager, UserManager userManager, RoleManager roleManager, IUnitOfWorkManager unitOfWorkManager, INotificationSubscribeAppService notificationSubscribeService)
        {
            _logInManager = logInManager;
            _tenantManager = tenantManager;
            _roleManager = roleManager;
            _unitOfWorkManager = unitOfWorkManager;
            _userManager = userManager;
            _notificationSubscribeService = notificationSubscribeService;
            LocalizationSourceName = AppointmentAppConsts.LocalizationSourceName;
        }


        public async Task<AjaxResponse> Register(RegisterModel model)
        {
            AjaxResponse response = new AjaxResponse();
            CheckModelState();

            var tenant = await GetActiveTenantAsync(Tenant.DefaultTenantName);

            //Create user
            var user = new User
            {
                TenantId = tenant.Id,
                Name = model.Name,
                Surname = model.Surname,
                EmailAddress = model.EmailAddress,
                PhoneNumber = model.Phone,              
                IsActive = true
            };

            if (model.UserName.IsNullOrEmpty() || model.Password.IsNullOrEmpty())
            {
                throw new UserFriendlyException(L("FormIsNotValidMessage"));
            }

            user.UserName = model.UserName;
            user.Password = new PasswordHasher().HashPassword(model.Password);


            //Add default roles
            user.Roles = new List<UserRole>();
            foreach (var defaultRole in _roleManager.Roles.Where(r => r.IsDefault).ToList())
            {
                user.Roles.Add(new UserRole { RoleId = defaultRole.Id });
            }

            //Save user
            var createResult = await _userManager.CreateAsync(user);
            if (!createResult.Succeeded)
            {
                response.Success = false;
                response.Error = new ErrorInfo
                {
                    Message = createResult.Errors.FirstOrDefault()
                };

                return response;
            }

            await _unitOfWorkManager.Current.SaveChangesAsync();

            await _notificationSubscribeService.Subscribe_Message(user.Id);
            //Directly login if possible

            AbpLoginResult<Tenant, User> loginResult;
            loginResult = await GetLoginResultAsync(user.UserName, model.Password, tenant.TenancyName);

            if (loginResult.Result == AbpLoginResultType.Success)
            {
                var ticket = new AuthenticationTicket(loginResult.Identity, new AuthenticationProperties());

                var currentUtc = new SystemClock().UtcNow;
                ticket.Properties.IssuedUtc = currentUtc;
                ticket.Properties.ExpiresUtc = currentUtc.Add(TimeSpan.FromMinutes(30));
                string protectedTicket = null;
                try
                {
                    protectedTicket = AccountController.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);
                }
                catch(Exception e)
                {

                }

                return new AjaxResponse(protectedTicket);
            }
            else
            {
                response.Success = false;
                throw new UserFriendlyException("Something went wrong");
            }
        }

        private async Task<AbpLoginResult<Tenant, User>> GetLoginResultAsync(string usernameOrEmailAddress, string password, string tenancyName)
        {
            var loginResult = await _logInManager.LoginAsync(usernameOrEmailAddress, password, tenancyName);

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    return loginResult;
                default:
                    throw CreateExceptionForFailedLoginAttempt(loginResult.Result, usernameOrEmailAddress, tenancyName);
            }
        }

        private Exception CreateExceptionForFailedLoginAttempt(AbpLoginResultType result, string usernameOrEmailAddress, string tenancyName)
        {
            switch (result)
            {
                case AbpLoginResultType.Success:
                    return new ApplicationException("Don't call this method with a success result!");
                case AbpLoginResultType.InvalidUserNameOrEmailAddress:
                case AbpLoginResultType.InvalidPassword:
                    return new UserFriendlyException(L("LoginFailed"), L("InvalidUserNameOrPassword"));
                case AbpLoginResultType.InvalidTenancyName:
                    return new UserFriendlyException(L("LoginFailed"), L("ThereIsNoTenantDefinedWithName{0}", tenancyName));
                case AbpLoginResultType.TenantIsNotActive:
                    return new UserFriendlyException(L("LoginFailed"), L("TenantIsNotActive", tenancyName));
                case AbpLoginResultType.UserIsNotActive:
                    return new UserFriendlyException(L("LoginFailed"), L("UserIsNotActiveAndCanNotLogin", usernameOrEmailAddress));
                case AbpLoginResultType.UserEmailIsNotConfirmed:
                    return new UserFriendlyException(L("LoginFailed"), "Your email address is not confirmed. You can not login"); //TODO: localize message
                default: //Can not fall to default actually. But other result types can be added in the future and we may forget to handle it
                    Logger.Warn("Unhandled login fail reason: " + result);
                    return new UserFriendlyException(L("LoginFailed"));
            }
        }

        private async Task<Tenant> GetActiveTenantAsync(string tenancyName)
        {
            var tenant = await _tenantManager.FindByTenancyNameAsync(tenancyName);
            if (tenant == null)
            {
                throw new UserFriendlyException(L("ThereIsNoTenantDefinedWithName{0}", tenancyName));
            }

            if (!tenant.IsActive)
            {
                throw new UserFriendlyException(L("TenantIsNotActive", tenancyName));
            }

            return tenant;
        }

        protected virtual void CheckModelState()
        {
            if (!ModelState.IsValid)
            {
                throw new UserFriendlyException("Invalid request!");
            }
        }
    }
}
