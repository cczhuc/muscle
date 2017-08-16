'use strict';

angular.module('admin')
    .directive('sidebar', ['$location', function () {
        return {
            templateUrl: 'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, roleService, managerService, $rootScope, $state, moduleService, commonUtil) {

                var self = managerService.getSelfDetail();
                if (self == undefined) {
                    $rootScope.alert("您还未登录", function () {
                        $state.go("login");
                    });
                    return false;
                } else {
                    $rootScope.uid = self.role.id;
                }
                //请求模块
                roleService.getRoleModule(self.role.id).then(function (res) {
                    if (res.data.code == 0) {
                        if (sessionStorage.mineSide == '' || sessionStorage.mineSide == undefined) {
                            moduleService.batchGetModule(res.data.data.mids).then(function (res) {
                                if (res.data.code == 0) {
                                    //存入模板信息用于验证
                                    localStorage["moduleList"] = JSON.stringify(res.data.data.moduleList);
                                    $scope.sideList = commonUtil.buildTree(res.data.data.moduleList);
                                }
                            });
                        }
                        else {
                            $scope.sideList = JSON.parse(sessionStorage["mineSide"]);
                        }
                    }
                });
                // 刷新后
                // 自动选中刷新前的侧边栏
                $scope.sideClick = function (id) {
                    var stopId = '';
                    angular.forEach($scope.sideList, function (items, index) {
                        angular.forEach(items.nodes, function (item) {
                            if (id == item.id) {
                                $scope.collapseVar = index;
                                item.selected = true;
                                items.se = true;
                                //stopid值是记录了应该展开的模块id
                                stopId = items.id;
                            }
                            else if (stopId != items.id) {
                                item.selected = false;
                                items.se = false;
                            }
                            else if (id != item.id && stopId == items.id) {
                                item.selected = false;
                            }
                        })
                    });
                    console.log($scope.sideList);
                    sessionStorage.mineSide = JSON.stringify($scope.sideList);
                };

            }
        }
    }]);
