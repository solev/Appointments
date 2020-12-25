using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AppointmentApp.Users;

namespace AppointmentApp.Sessions.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsActive { get; set; }
    }
}
