using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Runtime.Session;
using Abp.Web.Models;
using AppointmentApp.Messages;
using AppointmentApp.Messages.Dto;
using AppointmentApp.Users;
using AppointmentApp.Web.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace AppointmentApp.Web.Controllers
{
    [AbpAuthorize]
    public class MessageController : AppointmentAppControllerBase
    {
        private readonly IMessageAppService _messageService;
        private readonly IAbpSession _AbpSession;
        private readonly IUserAppService _userService;

        public MessageController(IMessageAppService messageService, IAbpSession AbpSession, IUserAppService userService)
        {
            _messageService = messageService;
            _AbpSession = AbpSession;
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> SendMessage(int userId, string message)
        {
            var currentUserInfo = await _userService.Get(new EntityDto<long>(_AbpSession.GetUserId()));
            CreateMessageInput input = new CreateMessageInput
            {
                Content = message,
                RecieverId = userId,
                SenderId = currentUserInfo.Id
            };

            await _messageService.Create(input);

            AppointmentHub.Static_Message(userId, currentUserInfo.FullName, message);

            return Json(new AjaxResponse { Success = true });
        }
    }
}