using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using AppointmentApp.EntityFramework;

namespace AppointmentApp.Migrator
{
    [DependsOn(typeof(AppointmentAppDataModule))]
    public class AppointmentAppMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<AppointmentAppDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}