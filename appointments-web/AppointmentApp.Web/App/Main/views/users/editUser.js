(function () {
    angular.module('app').controller('app.views.users.editUser', [
        '$scope', '$uibModalInstance', 'abp.services.app.user', 'abp.services.app.role', 'appSession', 'filterFilter',
        function ($scope, $uibModalInstance, userService, roleService, appSession, filterFilter) {

            $scope.Roles = [];
            $scope.user = angular.copy(appSession.userToEdit);
            $scope.saving = false;

            console.log($scope.user);

            $scope.cancel = function ()
            {
                $uibModalInstance.close(false);
            };

            $scope.save = function () {

                $scope.saving = true;             
                console.log($scope.user);

                abp.ui.setBusy($('#editUserModal'), userService.update($scope.user).success(function () {

                    abp.notify.success('User saved successfully');
                    $uibModalInstance.close(true);

                }).error(function () {
                    $scope.saving = false;
                    abp.notify.error('Error happened, user wasn\'t saved.');
                }));

            }

            $scope.UserRolesCount = function()
            {
                var k = 0;
                angular.forEach($scope.Roles, function (value, key) {
                    if (value.selected)
                        k++;
                })

                return k;
            }

            //roleService.getAll().success(function (data) {
            //    $scope.Roles = data;
            //    angular.forEach($scope.Roles, function (value, key) {
            //        value.selected = filterFilter($scope.user.roles, { roleId: value.id }).length > 0;
            //    });
            //});

        }
    ]);
})();