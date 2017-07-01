/**
 * Created by Administrator on 2017/3/8.
 */

//这是单个时间的绑定，一个页面允许有多个，但是绑定的ID需不同
angular.module('admin')
    .directive('dateTimePickerOnly', function ($filter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'js/directives/dateTimePickerOnly/dateTimePickerOnly.html',
            scope: {
                //跟外面的双向绑定
                dateData: '=',
                //最小时间
                minView: '@',
                //是否不能选今天之前
                onlyTodayAfter: '@',
                //独立ID
                dateId: '@',
                //是否需要禁用表单,只有为1的时候才会禁用,必需要onlyTodayAfter存在才能禁用
                disab: '=?',
                //时间如何显示，如果只需要显示到天，添加此属性
                isDay: '@',
                //传出一个时间，用于禁用状态打印到页面
                dateDataP:"=?"
            },
            controller: function ($scope) {
                //处理时间为空的情况
                //不能选以前的时间
                $scope.startDateBeforeRender = function ($dates) {
                    $scope.dateOption = $dates;
                    if ($scope.onlyTodayAfter) {
                        var myData = new Date();
                        var yesterdaty = myData.setDate(myData.getDate() - 1);
                        var activeDate = moment(yesterdaty);
                        $dates.filter(function (date) {
                            return date.localDateValue() < activeDate.valueOf();
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                };
                //手动将时间删除时
                $scope.dateChange = function () {
                   if ($scope.dateDataP==="") {
                       $scope.dateData = null
                   }
                };
                //配置的参数
                $scope.config = {
                    dropdownSelector: '#' + $scope.dateId,
                    minView: $scope.minView,
                    modelType: 'Date'
                };
                //当statu为1时，清空所有；
                $scope.$watch('disab', function () {
                    if (+$scope.disab === 1) {
                        $scope.dateDataP = null;
                        $scope.dateDataOut = null;
                    }
                });
                //转为我想要的日期格式
                $scope.$watch('dateData', function () {
                    if ($scope.dateData != null&&$scope.dateData!==0) {
                        $scope.dateData = !!$scope.dateData?$scope.dateData:null;
                        if ($scope.isDay) {
                            $scope.dateData = new Date($scope.dateData).getTime();
                            $scope.dateDataP = $scope.dateData!==0?$filter('date')($scope.dateData, 'yyyy/MM/dd'):null;
                        }else {
                            $scope.dateData = new Date($scope.dateData).getTime();
                            $scope.dateDataP = $scope.dateData!==0?$filter('date')($scope.dateData, 'yyyy/MM/dd  hh:mm'):null;
                        }
                        //将值传出去
                        if ($scope.disab == 1) {
                            //$scope.dateDataP = null;
                            $scope.dateData = null;
                        }
                    }
                });
            }
        }
    });