/**
 * Created by Administrator on 2017/3/7.
 */
'use strick';
angular.module('admin')
  .directive('kityminder',function () {
    return {
        restrict: 'EA',
        templateUrl: 'js/directives/kityminder/kityminder.html',
        replace: true,
        scope: {
            kityData:'='
        },
        link:function (scope) {
            scope.km = window.km = new kityminder.Minder({
                renderTo: '.minder-view'
            });
            scope.$watch('kityData',function () {
                scope.km.importJson(scope.kityData)
            });
            scope.root = function () {
                scope.km.execCommand('Camera', scope.km.getRoot());
            };
            scope.zoom = function (offset) {
                if (offset && offset > 0) {
                    scope.km.execCommand('ZoomIn');
                } else if (offset && offset < 0) {
                    scope.km.execCommand('ZoomOut');
                }
            };
        }
    }
})