(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.views.users.sendMessageModal', sendMessageModal);

    sendMessageModal.$inject = ['$scope', '$http', '$uibModalInstance', 'user'];

    function sendMessageModal($scope, $http, $uibModalInstance, user) {
        $scope.user = user;
        $scope.message;

        $scope.sending = false;

        $scope.send = function () {
            $scope.sending = true;
            var data = {
                userId: user.id,
                message: $scope.message
            }

            $http.post("/message/SendMessage", data).then(function (response) {
                abp.notify.success("Message Sent");
                $uibModalInstance.close();
            });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        }
    }

})();
