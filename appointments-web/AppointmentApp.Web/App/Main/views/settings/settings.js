(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.views.users.settings', settings);

    settings.$inject = ['$location', '$scope', 'abp.services.app.applicationSettings'];

    function settings($location, $scope, applicationSettingsService) {
        $scope.holdTime;
        $scope.maxHoldTime;
        $scope.daysInAdvance;

        $scope.colors = {
            availableColor: null,
            witheldColor: null,
            bookedColor: null,
            notAvailableColor: null
        };

        $scope.saving = false;

        function getData() {
            applicationSettingsService.getAllSettings().success(function (result) {
                if (result) {
                    angular.forEach(result, function (val) {
                        if (val.name == "HoldTime") {
                            $scope.holdTime = +val.value;
                        }
                        else if (val.name == "MaxHoldTime") {
                            $scope.maxHoldTime = +val.value;
                        }
                        else if (val.name == "DaysInAdvance") {
                            $scope.daysInAdvance = +val.value;
                        }
                        else if (val.name == "AvailableColor") {
                            $scope.colors.availableColor = val.value;
                        }
                        else if (val.name == "WithheldColor") {
                            $scope.colors.witheldColor = val.value;
                        }
                        else if (val.name == "BookedColor") {
                            $scope.colors.bookedColor = val.value;
                        }
                        else if (val.name == "NotAvailableColor") {
                            $scope.colors.notAvailableColor = val.value;
                        }
                    });
                }
            });
        }
        

        $scope.save = function () {
            var data = {
                holdTime: $scope.holdTime,
                maxHoldTime: $scope.maxHoldTime,
                daysInAdvance: $scope.daysInAdvance
            }

            data = angular.extend(data, $scope.colors);

            $scope.saving = true;

            applicationSettingsService.updateSettings(data).success(function () {
                abp.notify.success(App.localize('SavedSuccessfully'));
                $scope.saving = false;
                getData();
            });
        }

        getData();
    }

})();
