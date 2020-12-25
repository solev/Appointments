(function () {
    angular.module('app').directive('customTable', ['$timeout', '$uibModal', '$parse', 'appSession', function ($timeout, $uibModal, $parse, appSession) {

        var controller = ['$scope', function ($scope) {

            $scope.PageNumbers = [10, 20, 50, 100];
            $scope.TotalCount = 0;
            $scope.CurrentSort = null;
            $scope.CurrentPage = 1;
            $scope.ItemsPerPage = $scope.PageNumbers[0];
            $scope.Search = null;

            //$scope.selectedItem = {};

            $scope.data = [];

            $scope.headings = $scope.properties.headings;
            $scope.columns = $scope.properties.columns;

            $scope.getData = function () {

                var input = {
                    SkipCount: (($scope.CurrentPage - 1) * $scope.ItemsPerPage),
                    MaxResultCount: $scope.ItemsPerPage,
                    Sorting: $scope.CurrentSort,
                    Search: $scope.Search
                }

                abp.ui.setBusy(
                    null,
                    $scope.properties.getData(input).success(function (result) {

                        $scope.TotalCount = result.totalCount;
                        $scope.data = result.items;
                        
                    }));
            }

            $scope.DeleteUser = function (user) {

                abp.message.confirm(
                    'User ' + user.userName + ' will be deleted.',
                    'Are you sure?',
                    function (isConfirmed) {
                        if (isConfirmed) {
                            //...delete user
                            abp.ui.setBusy(null, $scope.properties.delete(user).success(function (result) {
                                abp.notify.success('Successfylly deleted.');
                                $scope.getData();
                            }));
                        }
                    }
                );
            }

            $scope.EditUser = function (user) {
                appSession.userToEdit = user;
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/users/editUser.cshtml',
                    controller: 'app.views.users.editUser',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (success) {
                    if (success) {
                        $scope.getData();
                    }
                });
            }

            $scope.sendMessage = function (user) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/users/sendMessageModal.cshtml',
                    controller: 'app.views.users.sendMessageModal',
                    resolve: {
                        user: function () {
                            return user;
                        }
                    }
                });
            }

            $scope.properties.updateItem = function (item) {
                angular.forEach($scope.data, function (el, idx) {
                    if (el.id == item.id) {
                        $scope.data[idx] = angular.extend($scope.data[idx], item);
                    }
                });
            }

            $scope.properties.refresh = $scope.getData;

            $scope.properties.clearSelection = function () {
                $scope.selectedItem = null;
            }

            $scope.SortOrder = function (optionasc, optiondesc) {

                optionasc = optionasc.charAt(0).toUpperCase() + optionasc.slice(1);
                optiondesc = optiondesc.charAt(0).toUpperCase() + optiondesc.slice(1);


                if ($scope.CurrentSort != optionasc) {
                    $scope.CurrentSort = optionasc;
                }
                else {
                    $scope.CurrentSort = optiondesc;
                }

                $scope.getData();
            }

            $scope.selectItem = function (item) {
                $scope.selectedItem = item;
                $scope.properties.onItemSelected(item);
            }

            $scope.firstUC = function (value) {
                return value.charAt(0).toUpperCase() + value.slice(1);
            }            

            $scope.getData();

        }];


        return {            
            restrict: 'E',
            templateUrl: '/App/Main/directives/customTable/customTable.cshtml',
            scope: {
                properties: '=' // {columns, getData, onItemSelected}
            },
            controller: controller
        };


    }]);
})();