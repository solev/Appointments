using System.Data.Common;
using Abp.Zero.EntityFramework;
using AppointmentApp.Authorization.Roles;
using AppointmentApp.MultiTenancy;
using AppointmentApp.Users;
using System.Data.Entity;
using AppointmentApp.Advisers;
using AppointmentApp.Slots;
using AppointmentApp.Messages;

namespace AppointmentApp.EntityFramework
{
    public class AppointmentAppDbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        public IDbSet<Adviser> Advisers { get; set; }
        public IDbSet<Slot> Slots { get; set; }
        public IDbSet<Message> Messages { get; set; }

        /* NOTE: 
         *   Setting "Default" to base class helps us when working migration commands on Package Manager Console.
         *   But it may cause problems when working Migrate.exe of EF. If you will apply migrations on command line, do not
         *   pass connection string name to base classes. ABP works either way.
         */
        public AppointmentAppDbContext()
            : base("Default")
        {

        }

        /* NOTE:
         *   This constructor is used by ABP to pass connection string defined in AppointmentAppDataModule.PreInitialize.
         *   Notice that, actually you will not directly create an instance of AppointmentAppDbContext since ABP automatically handles it.
         */
        public AppointmentAppDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        //This constructor is used in tests
        public AppointmentAppDbContext(DbConnection connection)
            : base(connection, true)
        {

        }
    }
}
