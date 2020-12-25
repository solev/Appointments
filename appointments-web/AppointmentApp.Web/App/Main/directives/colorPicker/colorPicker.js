(function () {
    'use strict';

    angular
        .module('app')
        .directive('colorPicker', colorPicker);

    colorPicker.$inject = ['$timeout'];

    function colorPicker($timeout) {        

        var directive = {
            link: link,
            restrict: 'E',
            require: 'ngModel',
            templateUrl: '/App/Main/directives/colorPicker/colorPicker.cshtml',            
            scope: {
                ngModel: '='                
            }
        };

        return directive;

        function link(scope, element, attrs, ngModel) {

            $timeout(function () {
                var picker = angular.element(element[0].querySelector(".input-group"));
                var cp;
                var internal = false;
                picker.colorpicker();
                
                var recreate = function () {
                    var hasColor = ngModel != null && ngModel.$modelValue != undefined && ngModel.$modelValue != null && ngModel.$modelValue.length > 0;
                    picker.colorpicker('destroy');
                    cp = picker.colorpicker({
                        color: hasColor ? ngModel.$modelValue : false
                    });

                    attachEventHandler(cp);
                }

                function attachEventHandler(obj) {
                    obj.on("changeColor", function (event) {
                        var hex = event.color.toHex();
                        if(internal)
                            ngModel.$setViewValue(hex);
                    });

                    obj.on("showPicker", function () {
                        internal = true;
                        console.log("show Picker");
                    });

                    obj.on("hidePicker", function () {
                        internal = false;
                        console.log("hidePicker");
                    });
                }

                scope.$watch(function () {
                    return ngModel.$modelValue;
                },
                function (newVal) {
                    if (!internal) {
                        //scope.changeColor(newVal);
                        recreate();
                    }                    
                }, true);

            });
        }           
    }

})();

// Usage:
//     <color-picker ng-model='myModel'></color-picker>
// Creates:
//