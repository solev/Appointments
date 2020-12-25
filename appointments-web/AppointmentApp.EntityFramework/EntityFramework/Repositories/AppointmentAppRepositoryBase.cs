using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace AppointmentApp.EntityFramework.Repositories
{
    public abstract class AppointmentAppRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<AppointmentAppDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected AppointmentAppRepositoryBase(IDbContextProvider<AppointmentAppDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class AppointmentAppRepositoryBase<TEntity> : AppointmentAppRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected AppointmentAppRepositoryBase(IDbContextProvider<AppointmentAppDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
