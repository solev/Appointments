(function() {
    angular.module('app').controller('app.views.users.index', [
        '$scope', '$modal', 'abp.services.app.user',
        function ($scope, $modal, userService) {
            var vm = this;
                      

            $scope.tableProperties = {
                columns: [
                    { heading: 'User Name', value: 'userName' },
                    { heading: 'First Name', value: 'name' },
                    { heading: 'Last Name', value: 'surname' },
                    { heading: 'Email Adress', value: 'emailAddress' },
                    { heading: 'Is Active', value: 'isActive', isBool: true }
                ],
                getData: userService.getAll,
                delete: userService.delete,
                onItemSelected: OnTableItemSelected
            };
            
            vm.openUserCreationModal = function() {
                var modalInstance = $modal.open({
                    templateUrl: '/App/Main/views/users/createModal.cshtml',
                    controller: 'app.views.users.createModal as vm',
                    backdrop: 'static'
                });

                modalInstance.result.then(function () {
                    $scope.tableProperties.refresh();
                });
            };


            abp.services.app.applicationSettings.getAllSettings().then(function (result) {
                console.log(result);
            });

            function OnTableItemSelected(item) {

            }

        }
    ]);
})();