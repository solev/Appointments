(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.views.users.advisers', advisers);

    advisers.$inject = ['$scope', '$state', 'abp.services.app.adviser'];

    function advisers($scope, $state, adviserService) {
        $scope.advisers = [];

        abp.ui.setBusy(null,
            adviserService.getAll({ MaxResultCount: 999 }).success(function (response) {
                $scope.advisers = response.items;
            }));        
    }
})();
