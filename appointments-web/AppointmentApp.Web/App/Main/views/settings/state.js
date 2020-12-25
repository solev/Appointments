(function () {
    'use strict';

    angular
        .module('app')
        .config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {            

            //if (abp.auth.hasPermission('Pages.Users')) {
                $stateProvider
                    .state('settings', {
                        url: '/settings',
                        templateUrl: '/App/Main/views/settings/settings.cshtml',
                        controller: 'app.views.users.settings',
                        menu: 'Settings' //Matches to name of 'Users' menu in AppointmentAppNavigationProvider
                    });
                //$urlRouterProvider.otherwise('/users');
            //}


        }
    ]);
})();