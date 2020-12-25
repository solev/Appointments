(function () {
    'use strict';

    angular
        .module('app')
        .config([
            '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                
                $stateProvider
                    .state('advisers', {
                        url: '/advisers',
                        templateUrl: '/App/Main/views/advisers/advisers.cshtml',
                        controller: 'app.views.users.advisers',
                        menu: 'Advisers' //Matches to name of 'Users' menu in AppointmentAppNavigationProvider
                    });

                $stateProvider
                    .state('adviserProfile', {
                        url: '/adviserProfile/:adviserId',
                        templateUrl: '/App/Main/views/advisers/adviserProfile.cshtml',
                        controller: 'app.views.users.adviserProfile'                        
                    });

            }
        ]);
})();