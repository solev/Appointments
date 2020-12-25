﻿(function () {
    'use strict';

    angular
        .module('app')
        .directive('select2', select2Directive);

    function select2Directive($timeout, $parse) {

        var directive = {
            link: link,
            restrict: 'EA',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs) {

            $timeout(function () {
                element.select2();
                element.select2Initialized = true;
            });

            var refreshSelect = function () {

                if (!element.select2Initialized) return;

                $timeout(function () {
                    element.trigger('change');
                });

            };

            var recreateSelect = function () {

                if (!element.select2Initialized) return;

                $timeout(function () {
                    element.select2('destroy');
                    element.select2();
                });
            };

            scope.$watch(attrs.ngModel, function () {
                refreshSelect();
            });

            if (attrs.ngOptions) {
                var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
                // watch for option list change
                scope.$watch(list, recreateSelect);
            }

            if (attrs.ngDisabled) {
                scope.$watch(attrs.ngDisabled, refreshSelect);
            }
        }
    }

})();