using System.Linq;
using AppointmentApp.EntityFramework;
using AppointmentApp.MultiTenancy;

namespace AppointmentApp.Migrations.SeedData
{
    public class DefaultTenantCreator
    {
        private readonly AppointmentAppDbContext _context;

        public DefaultTenantCreator(AppointmentAppDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateUserAndRoles();
        }

        private void CreateUserAndRoles()
        {
            //Default tenant

            var defaultTenant = _context.Tenants.FirstOrDefault(t => t.TenancyName == Tenant.DefaultTenantName);
            if (defaultTenant == null)
            {
                _context.Tenants.Add(new Tenant {TenancyName = Tenant.DefaultTenantName, Name = Tenant.DefaultTenantName});
                _context.SaveChanges();
            }
        }
    }
}
