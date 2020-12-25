(function () {
    'use strict';

    angular
        .module('app')
        .controller('app.views.users.adviserProfile', adviserProfile);

    adviserProfile.$inject = ['$scope', '$stateParams', '$q','$http' ,'abp.services.app.adviser', 'abp.services.app.slot', 'abp.services.app.applicationSettings'];

    function adviserProfile($scope, $stateParams, $q, $http, adviserService, slotService, applicationSettingsService) {

        $scope.adviser = {};
        $scope.slots = [];

        $scope.dates = [];
        $scope.times = [];
        $scope.timeSlots = [];
        $scope.startingDate = new Date();
                
        generateDates();
        generateTimes();
        getData();

        $scope.isToday = function (date) {
            return (new Date().getDate() == date.getDate());
        }        

        $scope.nextWeek = function () {            
            var skipDays = 0;
            var currentDate = new Date($scope.startingDate);

            while (true) {
                currentDate.setDate(currentDate.getDate() + 1);
                skipDays++;
                if (currentDate.getDay() == 1) {
                    break;
                }
            }
            
            $scope.startingDate.setDate($scope.startingDate.getDate() + skipDays);
            generateDates();
            getSlotsView();

            //getSlots();
        }

        $scope.previousWeek = function () {
            var today = new Date();
            var diffDays = dateDiffInDays(today, $scope.startingDate);
            if (diffDays <= 7) {
                $scope.startingDate = today;
            }
            else {
                $scope.startingDate.setDate($scope.startingDate.getDate() - 7);
            }
            generateDates();
            getSlotsView();
        }

        $scope.hasSlot = function (time, date) {
            var res = false;
            angular.forEach($scope.slots, function (el) {
                var slotDateStamp = Date.parse(el.formattedDate);
                var slotDate = new Date(slotDateStamp);
                var formattedTime = getFormattedTime(slotDate);

                if (time == formattedTime && date.getDate() == slotDate.getDate()) {
                    res = true;
                }                
            });
            
            return res;
        }

        function getData() {
            var adviserInput = {
                id: $stateParams.adviserId
            };
            
            var adviserInfo = adviserService.getWithSlots(adviserInput);

            adviserInfo.success(function (response) {
                $scope.adviser = response.adviser;
                $scope.slots = response.slots;                
            });

            getSlotsView();

            abp.ui.setBusy(null, $q.all([adviserInfo]));
        }

        function getSlotsView() {
            var slotsInput = {
                startDate: $scope.startingDate.toDateString() + " 09:00",
                endDate: $scope.dates[6].toDateString() + " 23:50",
                adviserId: $stateParams.adviserId
            };

            console.log(slotsInput);

            $("#appointmentSlotsBody").html("Loading...");
            var req = $http.post('/Adviser/GetAppointmentSlots', slotsInput);
            req.success(function (response) {                
                $("#appointmentSlotsBody").html(response);
            });            
        }

        function getSlots() {
            var slotsInput = {
                startDate: $scope.startingDate.toDateString() + " 09:00",
                endDate: $scope.dates[6].toDateString() +" 23:50",
                adviserId: $stateParams.adviserId
            };

            console.log(slotsInput);

            var slotsInfo = slotService.getAll(slotsInput);

            slotsInfo.success(function (response) {
                console.log(response);
            });

            abp.ui.setBusy(null, slotsInfo);
        }

        function generateDates() {
            $scope.dates = [];
            var today = new Date($scope.startingDate);
            $scope.dates.push(today);

            for (var i = 1; i < 7; i++) {                
                today.setDate(today.getDate() + 1);
                $scope.dates.push(today);
            }
        }

        function generateTimes() {
            $scope.times = [];
            var today = new Date();
            today.setHours(9);
            today.setMinutes(0);

            $scope.times.push(getFormattedTime(today));
                        
            while (true) {
                today.setMinutes(today.getMinutes() + 10);
                $scope.times.push(getFormattedTime(today));
                if (today.getHours() == 23 && today.getMinutes() == 50) {
                    break;
                }
            }
        }

        function generateTimeSlots() {
            $scope.timeSlots = [];
            angular.forEach($scope.times, function(el) {

            });
        }

        function getFormattedTime(date) {
            return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
        }

        function dateDiffInDays(date1, date2) {
            var _MS_PER_DAY = 1000 * 60 * 60 * 24;            

            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / _MS_PER_DAY); 

            return diffDays;
        }

    }

})();
