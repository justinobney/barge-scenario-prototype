(function(){
    'use strict';

    var collapsibleDirective = function(){
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                return;
                scope.collapsed = false;
                var _elem = elem;
                var _attrs = attrs;

                var options = scope.$eval(_attrs.envocCollapse);

                var container = angular.element(elem);
                var trigger = container.find(options.trigger);
                var target = container.find(options.target);

                trigger.bind('click', function(){
                    scope.$apply(function(){
                        scope.collapsed = !scope.collapsed;
                        if (scope.collapsed) {
                            target.hide();
                        } else {
                            target.show();
                        }
                    });
                });
            }
        };
    };

    angular.module('draggableBoxes')
        .directive('envocCollapse', collapsibleDirective);
})();
