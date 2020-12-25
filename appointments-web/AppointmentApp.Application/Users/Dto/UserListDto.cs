using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace AppointmentApp.Users.Dto
{
    [AutoMap(typeof(User))]
    public class UserListDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string EmailAddress { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }       

        public bool IsActive { get; set; }
       
    }
}