/**
 * Created by Frank on 2017/3/11.
 */
angular.module('admin')
    .directive('setNgmodel',function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                ngModel: '=?'
            },
            controller:function ($scope) {
                $scope.ngModel = 0;
            }
        }

    });