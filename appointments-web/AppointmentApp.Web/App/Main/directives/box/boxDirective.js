(function() {
    'use strict';

    angular
        .module('app')
        .directive('box', boxDirective);

    boxDirective.$inject = ['$window'];
    
    function boxDirective ($window) {
        // Usage:
        //     <box></box>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            transclude: true,
            controller: controller,
            scope:{
                title:'@'
            },
            templateUrl: '/App/Main/directives/box/boxDirective.cshtml',
        };

        return directive;

        function link(scope, element, attrs) {
            console.log(scope.title);
        }

        function controller($scope) {
            
        }
    }

})();