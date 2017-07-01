/**
 * Created by Administrator on 2017/3/8.
 */
//基于angular-time-dateTimePicker的一段时间选择器
//暴露出两个接口dateRangeEnd开始时间，dateRangeStart结束时间，如果一个页面内有两个一段时间选择器，请修改代码，用@绑定一个字段进去，修改template里的id；
//minView表示这两个的最小可视时间
angular.module('admin')
    .directive('dateTimePickerSpell',function ($filter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl:'js/directives/dateTimePickerSpell/dateTimePickerSpell.html',
            scope:{
                //结束时间
                dateRangeEnd:'=',
                //起始时间
                dateRangeStart:'=',
                //最小时间视图
                minView:'@',
                //以下两个在同一个页面需要两个一段时间选择器的时候会用到
                //StartId
                startId:'@',
                //endID
                endId:'@',
                //显示的时候是否显示天
                isDay:'@'
            },
            controller:function ($scope) {
                //起始时间的的config：
                $scope.drop1 = $scope.startId||'dropdownStart';
                $scope.configStart = {
                    dropdownSelector: $scope.startId?'#'+$scope.startId:'#dropdownStart',
                    renderOn: 'end-date-changed',
                    minView: $scope.minView
                };
                //结束时间的config
                $scope.drop2 = $scope.endId||'dropdownEnd';
                $scope.configEnd = {
                    dropdownSelector: $scope.endId?'#'+$scope.endId:'#dropdownEnd',
                    renderOn: 'start-date-changed',
                    minView: $scope.minView
                };
                //处理一下他们的显示时间：
                //起始时间
                $scope.$watch('dateRangeStart',function () {
                    if ($scope.dateRangeStart) {
                        if (!$scope.isDay){
                            $scope.dateRangeStartP = $filter('date')($scope.dateRangeStart,'yyyy/MM/dd  HH:mm');
                        }else {
                            $scope.dateRangeStartP = $filter('date')($scope.dateRangeStart,'yyyy/MM/dd');
                        }
                    }
                });
                //结束时间
                $scope.$watch('dateRangeEnd',function () {
                    if ($scope.dateRangeEnd) {
                        if (!$scope.isDay){
                            $scope.dateRangeEndP = $filter('date')($scope.dateRangeEnd,'yyyy/MM/dd  HH:mm');
                        }else {
                            $scope.dateRangeEndP = $filter('date')($scope.dateRangeEnd,'yyyy/MM/dd');
                        }
                    }
                });
                //当手动删除时
                $scope.changeDateStart = function () {
                    if ($scope.dateRangeStartP==""){
                        $scope.dateRangeStart = null
                    }
                };
                $scope.changeDateEnd = function () {
                    if ($scope.dateRangeEndP==""){
                        $scope.dateRangeEnd=null
                    }
                };
                //下面就是他自带的验证代码了
                $scope.endDateBeforeRender = endDateBeforeRender;
                $scope.endDateOnSetTime = endDateOnSetTime;
                $scope.startDateBeforeRender = startDateBeforeRender;
                $scope.startDateOnSetTime = startDateOnSetTime;

                function startDateOnSetTime () {
                    $scope.$broadcast('start-date-changed');
                }

                function endDateOnSetTime () {
                    $scope.$broadcast('end-date-changed');
                }

                function startDateBeforeRender ($dates) {
                    if ($scope.dateRangeEnd) {
                        var activeDate = moment($scope.dateRangeEnd);

                        $dates.filter(function (date) {
                            return date.localDateValue() >= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }

                function endDateBeforeRender ($view, $dates) {
                    if ($scope.dateRangeStart) {
                        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                        $dates.filter(function (date) {
                            return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }
            }
        }
    });