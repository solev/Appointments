using System.Reflection;
using Abp.AutoMapper;
using Abp.Modules;
using AppointmentApp.Settings;

namespace AppointmentApp
{
    [DependsOn(typeof(AppointmentAppCoreModule), typeof(AbpAutoMapperModule))]
    public class AppointmentAppApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Modules.AbpAutoMapper().Configurators.Add(mapper =>
            {
                //Add your custom AutoMapper mappings here...
                //mapper.CreateMap<,>()
            });

            Configuration.Settings.Providers.Add<AppointmentAppSettingsProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
