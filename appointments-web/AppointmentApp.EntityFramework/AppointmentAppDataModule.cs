using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Abp.Zero.EntityFramework;
using AppointmentApp.EntityFramework;

namespace AppointmentApp
{
    [DependsOn(typeof(AbpZeroEntityFrameworkModule), typeof(AppointmentAppCoreModule))]
    public class AppointmentAppDataModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<AppointmentAppDbContext>());

            Configuration.DefaultNameOrConnectionString = "Default";
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
