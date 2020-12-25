using Abp.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Settings
{
    public class AppointmentAppSettingsProvider : SettingProvider
    {
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new[]
                {
                    new SettingDefinition(
                        SettingNames.HoldTime,
                        "30",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.MaxHoldTime,
                        "45",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.DaysInAdvance,
                        "0",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.AvailableColor,
                        "#000",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.WithheldColor,
                        "#000",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.BookedColor,
                        "#000",
                        scopes: SettingScopes.Application
                        ),
                    new SettingDefinition(
                        SettingNames.NotAvailableColor,
                        "#000",
                        scopes: SettingScopes.Application
                        )
                };
        }
    }
}
