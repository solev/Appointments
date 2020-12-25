using Abp.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentApp.Settings.Dto;
using Abp.Application.Services;

namespace AppointmentApp.Settings
{
    public class ApplicationSettingsAppService : ApplicationService, IApplicationSettingsAppService
    {
        public List<ISettingValue> GetAllSettings()
        {
            return SettingManager.GetAllSettingValues().ToList();
        }

        public void UpdateSettings(AppSettingsDto input)
        {            
            SettingManager.ChangeSettingForApplication(SettingNames.HoldTime, input.HoldTime.ToString());
            SettingManager.ChangeSettingForApplication(SettingNames.MaxHoldTime, input.MaxHoldTime.ToString());
            SettingManager.ChangeSettingForApplication(SettingNames.DaysInAdvance, input.DaysInAdvance.ToString());

            SettingManager.ChangeSettingForApplication(SettingNames.AvailableColor, input.AvailableColor);
            SettingManager.ChangeSettingForApplication(SettingNames.WithheldColor, input.WitheldColor);
            SettingManager.ChangeSettingForApplication(SettingNames.BookedColor, input.BookedColor);
            SettingManager.ChangeSettingForApplication(SettingNames.NotAvailableColor, input.NotAvailableColor);
        }
    }
}
