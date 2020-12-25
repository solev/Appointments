(function () {
    'use strict';

    angular
        .module('app')
        .directive('datePicker', datePicker);

    datePicker.$inject = ['$timeout'];

    function datePicker($timeout) {
        
        var directive = {
            link: link,
            restrict: 'EA'
        };

        return directive;

        function link(scope, element, attrs) {
            $timeout(function () {
                element.datepicker({
                    autoclose: true
                });
            });
        }
    }

})();