'use strict';
/***13   24   27   三处console.log**********/
angular.module('admin')
    .directive('sidebar', function () {
        return {
            templateUrl: 'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($http, $scope, $rootScope, $state, $location, roleService, managerService, moduleService, recordCookies, commonUtil) {

                var self = managerService.getSelfDetail();
                // console.log("self",self);
                if (self == undefined) {
                    $rootScope.alert("您还未登录", function () {
                        $state.go("login");
                    });
                    return false;
                } else {
                    $rootScope.uid = self.role.id;
                }

                roleService.getRole(self.role.id).then(function (res) {
                    // console.log(res);
                    if (res.data.code == 0) {
                        var moduleIDs = Object.keys(res.data.data.role.permissionsSet);
                        // console.log("moduleIDs",moduleIDs);
                        // console.log("save permission set");
                        localStorage["permissionsSet"] = JSON.stringify(res.data.data.role.permissionsSet);
                        $rootScope.permissionsSet = JSON.parse(localStorage["permissionsSet"]);

                        if (sessionStorage.mineSide == '' || sessionStorage.mineSide == undefined) {
                            moduleService.batchGetModule(moduleIDs).then(function (res) {
                                console.log("模块",res);
                                if (res.data.code == 0) {
                                    //存入模板信息用于验证
                                    localStorage["moduleList"] = JSON.stringify(res.data.data.moduleList);
                                    $scope.sideList = commonUtil.buildTree(res.data.data.moduleList);
                                    console.log("sidelist",$scope.sideList)
                                    // 刷新时的高亮标识
                                    //markLightFromUrl();
                                }
                            });
                        }
                        else {

                            $scope.sideList = JSON.parse(sessionStorage["mineSide"]);

                        }

                    }
                });


                //$scope.collapseVar = -1;
                //
                //$scope.getUrl = function (n) {
                //    recordCookies({moduleID: n.id});
                //    $scope.currentUrl = n.url;
                //    $rootScope.permissionSet = JSON.parse(localStorage["permissionsSet"]);
                //    var moduleId = n.id;
                //    var modulePermission = $rootScope.permissionSet[moduleId];
                //    console.log(n.id);
                //    $rootScope.globalPermission = {
                //        created: modulePermission.in_array("create"),
                //        updated: modulePermission.in_array("update"),
                //        deleted: modulePermission.in_array("delete"),
                //        sorted: modulePermission.in_array("sort")
                //    };
                //    console.log($rootScope.globalPermission);
                //
                //};
                //$scope.getUrl();
                //function markLightFromUrl() {
                //    console.log($scope.sideList);
                //    angular.forEach($scope.sideList, function(items, index) {
                //        angular.forEach(items.nodes, function(item, i) {
                //
                //
                //
                //            var stateName = $state.current.name;
                //            var itemParam = item.url.match(/\{[^\)]+\}/g);
                //
                //            //if (items.id == 103) {
                //            //    console.log($state.params,item.name,item.url.indexOf(stateName), itemParam);
                //            //}
                //
                //
                //            if (item.url.indexOf(stateName) > -1 && !itemParam && !($state.params.grade && $state.params.status)) {
                //
                //                // 展开项
                //                $scope.collapseVar = index;
                //                // 普通已选子菜单
                //                item.selected = true;
                //                recordCookies({moduleID: item.id});
                //                var modulePermission = $rootScope.permissionSet[item.id];
                //
                //                $rootScope.globalPermission = {
                //                    created :modulePermission.in_array("create"),
                //                    updated : modulePermission.in_array("update"),
                //                    deleted : modulePermission.in_array("delete"),
                //                    sorted  : modulePermission.in_array("sort")
                //                };
                //                console.log(item.id);
                //                console.log($rootScope.globalPermission);
                //
                //                return false;
                //
                //            } else if (item.url.indexOf(stateName) > -1 && !!itemParam) {
                //
                //                // 展开项
                //                $scope.collapseVar = index;
                //                // 特殊已选子菜单,老师和测验的路由状态一致，因此需要通过参数来进行对比判断
                //                // 安排课程也带有参数，因此也放入其中判断
                //                specialRules(item, itemParam);
                //                if (item.selected == true) {
                //                    //alert(123);
                //                    //alert(item.id);
                //                    recordCookies({moduleID: item.id});
                //                    var moduleId = item.id;
                //                    var modulePermission = $rootScope.permissionSet[moduleId];
                //                    //console.log(modulePermission.in_array("create"));
                //
                //                    $rootScope.globalPermission = {
                //                        created :modulePermission.in_array("create"),
                //                        updated : modulePermission.in_array("update"),
                //                        deleted : modulePermission.in_array("delete"),
                //                        sorted  : modulePermission.in_array("sort")
                //                    }
                //                    console.log(item.id);
                //                    console.log($rootScope.globalPermission);
                //                }
                //
                //                return false;
                //
                //            }
                //
                //
                //        })
                //    })
                //}


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
                    //console.log($scope.sideList);
                    sessionStorage.mineSide = JSON.stringify($scope.sideList);
                };


                function specialRules(item, itemParam) {

                    var itemParamString = itemParam[0].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
                    var itemParamJSON = JSON.parse(itemParamString);

                    if ($state.current.name == 'field.teacherList' && itemParamJSON.grade != undefined) {

                        if ($state.params.status == 0 && itemParamJSON.status == 0) {
                            item.selected = true;
                            return false;
                        } else if ($state.params.status == 1 && itemParamJSON.status != 0 && $state.params.grade == itemParamJSON.grade) {
                            item.selected = true;
                            return false;
                        }

                    } else if ($state.current.name == 'field.testList' && itemParamJSON.qtype != undefined) {
                        if ($state.params.qtype == itemParamJSON.qtype) {
                            item.selected = true;
                            return false;
                        }
                    } else if ($state.current.name == 'field.lessonSchedule') {
                        item.selected = true;
                        return false;
                    }
                }

            }
        }
    })
;