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
                        moduleService.batchGetModule(res.data.data.mids).then(function (res) {
                            if (res.data.code == 0) {
                                $scope.sideList = commonUtil.buildTree(res.data.data.moduleList);
	                            // console.log($scope.sideList);
                                // 刷新时的高亮标识
                                markLightFromUrl();
                            }
                        })
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
                    //console.log($scope.sideList);
                    sessionStorage.mineSide = JSON.stringify($scope.sideList);
                };


                $scope.getUrl = function (n) {
                    $scope.currentUrl = n.url;
                };

                function markLightFromUrl() {
                    // console.log($scope.sideList);
                    angular.forEach($scope.sideList, function (items, index) {
                        angular.forEach(items.nodes, function (item, i) {
                            var stateName = $state.current.name;//filed.daily
                            var itemParam = item.url.match(/\{[^\)]+\}/g);//{page:10}
	                       
                            if (item.url.indexOf(stateName) > -1 && !itemParam) {
                                // 展开项
                                $scope.collapseVar = index;
                                // 普通已选子菜单
                                item.selected = true;
                                return false;

                            } else if (item.url.indexOf(stateName) > -1 && !!itemParam) {
                                // 展开项
                                $scope.collapseVar = index;
                                // 特殊已选子菜单,需要通过参数来进行对比判断
                                specialRules(item, itemParam);
                                return false;
                            }
                        })
                    })
                }

                function specialRules(item, itemParam) {
                    var itemParamString = itemParam[0].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
                    var itemParamJSON = JSON.parse(itemParamString);
					
                    if ($state.current.name == 'field.materialList' && itemParamJSON.type != undefined) {
                        if ($state.params.type == itemParamJSON.type) {
                            item.selected = true;
                            return false;
                        } else {

                        }

                    }
                    else if ($state.current.name == 'field.server' && itemParamJSON.type != undefined) {
                        if ($state.params.type == itemParamJSON.type) {
                            item.selected = true;
                            return false;
                        }
                    }
                    else if($state.current.name == 'field.userList'){
                    	//用户管理
                    	if($state.params.branch==itemParamJSON.branch){
                    		item.selected=true;
		                    return false;
	                    }else {
	                    	if($state.params.branch===""&&itemParamJSON.branch===undefined){
			                    item.selected=true;
			                    return false;
		                    }
	                    }
                    }
                    else if ($state.current.name == 'field.contentsList' && itemParamJSON.type != undefined) {
                        if ($state.params.type == itemParamJSON.type) {
                            item.selected = true;
                            return false;
                        }
                    }
                    
                }

            }
        }
    }]);
