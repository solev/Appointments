namespace AppointmentApp.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class Slot_Entity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Slots",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        AdviserId = c.Int(nullable: false),
                        UserId = c.Long(),
                        Status = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        DeleterUserId = c.Long(),
                        DeletionTime = c.DateTime(),
                        LastModificationTime = c.DateTime(),
                        LastModifierUserId = c.Long(),
                        CreationTime = c.DateTime(nullable: false),
                        CreatorUserId = c.Long(),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Slot_SoftDelete", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Advisers", t => t.AdviserId, cascadeDelete: true)
                .ForeignKey("dbo.AbpUsers", t => t.UserId)
                .Index(t => t.AdviserId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Slots", "UserId", "dbo.AbpUsers");
            DropForeignKey("dbo.Slots", "AdviserId", "dbo.Advisers");
            DropIndex("dbo.Slots", new[] { "UserId" });
            DropIndex("dbo.Slots", new[] { "AdviserId" });
            DropTable("dbo.Slots",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Slot_SoftDelete", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
