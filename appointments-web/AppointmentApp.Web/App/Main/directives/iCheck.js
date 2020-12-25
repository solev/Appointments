(function () {
    angular.module('app').directive('iCheck', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            require: 'ngModel',

            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value;
                    value = $attrs['value'];

                    //element.css({
                    //    position: 'relative',
                    //    border: '1px solid red',
                    //    backgroundColor: 'lightgrey',
                    //    cursor: 'pointer'
                    //});

                    $scope.$watch($attrs['ngModel'], function (newValue) {
                        $(element).iCheck('update');
                    })

                    var el = $(element).iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue'

                    }).on('ifChanged', function (event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });                    
                });
            }
        };
    }]);
})();