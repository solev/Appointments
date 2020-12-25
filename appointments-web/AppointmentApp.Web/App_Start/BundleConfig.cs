using System.Web.Optimization;

namespace AppointmentApp.Web
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            //VENDOR RESOURCES

            //~/Bundles/App/vendor/css
            bundles.Add(
                new StyleBundle("~/Bundles/App/vendor/css")
                    .Include("~/Theme/bootstrap/css/bootstrap.min.css", new CssRewriteUrlTransform())
                    .Include("~/Theme/plugins/iCheck/minimal/_all.css", new CssRewriteUrlTransform())
                    .Include("~/Theme/plugins/colorpicker/bootstrap-colorpicker.min.css", new CssRewriteUrlTransform())
                    .Include(
                        "~/Theme/plugins/datatables/dataTables.bootstrap.css",                        
                        "~/Content/toastr.min.css",
                        "~/Scripts/sweetalert/sweet-alert.css",
                        "~/Content/flags/famfamfam-flags.css",
                        "~/Content/loading-bar.css",
                        "~/Scripts/mCustomScrollbar/jquery.mCustomScrollbar.min.css",
                        "~/Theme/plugins/pace/pace.css",
                        "~/Theme/dist/css/AdminLTE.css",
                        "~/Theme/dist/css/skins/_all-skins.min.css"
                    )
                    .Include("~/Content/font-awesome.min.css", new CssRewriteUrlTransform())
                );

            //~/Bundles/App/vendor/js
            bundles.Add(
                new ScriptBundle("~/Bundles/App/vendor/js")
                    .Include(
                        "~/Abp/Framework/scripts/utils/ie10fix.js",
                        "~/Scripts/json2.min.js",

                        "~/Scripts/modernizr-2.8.3.js",

                        "~/Scripts/jquery-2.2.0.min.js",
                        "~/Scripts/jquery-ui-1.11.4.min.js",

                        "~/Scripts/bootstrap.min.js",


                        "~/Theme/plugins/slimScroll/jquery.slimscroll.min.js",
                        "~/Theme/plugins/fastclick/fastclick.min.js",
                        "~/Theme/plugins/colorpicker/bootstrap-colorpicker.min.js",                        

                        "~/Theme/dist/js/app.min.js",
                        "~/Theme/dist/js/demo.js",

                        "~/Scripts/moment-with-locales.min.js",
                        "~/Scripts/jquery.blockUI.js",
                        "~/Scripts/toastr.min.js",
                        "~/Scripts/sweetalert/sweet-alert.min.js",
                        "~/Scripts/others/spinjs/spin.js",
                        "~/Scripts/others/spinjs/jquery.spin.js",

                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-animate.min.js",
                        "~/Scripts/angular-sanitize.min.js",
                        "~/Scripts/angular-ui-router.min.js",
                        "~/Scripts/angular-ui/ui-bootstrap.min.js",
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                        "~/Scripts/angular-ui/ui-utils.min.js",
                        "~/Theme/plugins/angular-auto-validate/jcs-auto-validate.min.js",
                        "~/Scripts/loading-bar.js",

                        "~/Abp/Framework/scripts/abp.js",
                        "~/Abp/Framework/scripts/libs/abp.jquery.js",
                        "~/Abp/Framework/scripts/libs/abp.toastr.js",
                        "~/Abp/Framework/scripts/libs/abp.blockUI.js",
                        "~/Abp/Framework/scripts/libs/abp.spin.js",
                        "~/Abp/Framework/scripts/libs/abp.sweet-alert.js",
                        "~/Abp/Framework/scripts/libs/angularjs/abp.ng.js",

                        "~/Scripts/jquery.signalR-2.2.1.min.js",

                        "~/Scripts/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js",
                        "~/Scripts/mCustomScrollbar/scrollbars.min.js",
                        "~/Theme/plugins/pace/pace.min.js"
                    )
                );

            //APPLICATION RESOURCES

            //~/Bundles/App/Main/css
            bundles.Add(
                new StyleBundle("~/Bundles/App/Main/css")
                    .IncludeDirectory("~/App/Main", "*.css", true)
                );

            //~/Bundles/App/Main/js
            bundles.Add(
                new ScriptBundle("~/Bundles/App/Main/js")
                    .IncludeDirectory("~/Common/Scripts", "*.js", true)
                    .IncludeDirectory("~/App/Main", "*.js", true)
                );
        }
    }
}