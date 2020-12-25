using AppointmentApp.EntityFramework;
using EntityFramework.DynamicFilters;

namespace AppointmentApp.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly AppointmentAppDbContext _context;

        public InitialHostDbBuilder(AppointmentAppDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
        }
    }
}
