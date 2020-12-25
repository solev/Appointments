using Abp.Application.Services;
using Abp.Configuration;
using AppointmentApp.Settings.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Settings
{
    public interface IApplicationSettingsAppService : IApplicationService
    {
        void UpdateSettings(AppSettingsDto input);

        List<ISettingValue> GetAllSettings();
    }
}
