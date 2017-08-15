'use strict';

angular.module('admin', ['oc.lazyLoad', 'ui.router', 'ngCookies', 'mgcrea.ngStrap', 'angularFileUpload', 'angular-loading-bar', 'ngMessages'])
    .factory('recordCookies', recordCookies)
    .config(httpConfig)
    .config(lazyLoadConfig)
    // .config(projectRouteConfig)
    .config(loadingBar)
    .run(function ($rootScope, $templateCache, $modal, $cookies, $state, $location, managerService, roleService) {
        //默认分页参数
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams,managerService,roleService) {


            if (toParams.page != undefined) {
                toParams.page = toParams.page || 1;
            }
            if (toParams.size != undefined) {
                toParams.size = toParams.size || 10;
            }
        });

        $rootScope.isLogin = function () {
            return !!$cookies.login;
        };
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.isLogin() && $location.path() !== "/login") {
                $state.go("login");
                return false;
            }
            if ($rootScope.isLogin() && $location.path() === "/login") {
                $state.go("field.dashboard");
                return false;
            }
            // window.scrollTo(0, 0);
            // //权限验证
            // //取出数据
            // var permissionsSet = JSON.parse(localStorage.permissionsSet);
            // var moduleList = JSON.parse(localStorage.moduleList);
            // var name = $state.current.name;
            // //进行比对
            // var permision = [];
            // angular.forEach(moduleList,function (data) {
            //     if (data.url==name) {
            //         permision = permissionsSet[data.id]            $rootScope.permision = {
            //             create:permision.indexOf('create')===-1?false:true,
            //             update:permision.indexOf('update')===-1?false:true,
            //             delete:permision.indexOf('delete')===-1?false:true,
            //         }
            //     }
            // });
        });


        $rootScope.$on('$viewContentLoading', function (event) {
            console.log('视图开始加载');
        });
        $rootScope.$on('$viewContentLoaded', function (event) {
            console.log('视图渲染完毕');
        });

        //alert confirm notify
        $rootScope.alert = function (content, okFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/ptteng-alert-0.0.1.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };
        $rootScope.confirm = function (content, okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/ptteng-confirm-0.0.1.html',
                controller: function ($scope) {
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };

        //操作确认
        $rootScope.operationConfirm = function (title, content, okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'views/template/operationConfirm.html',
                controller: function ($scope) {
                    $scope.title = title;
                    $scope.content = content;
                    $scope.ok = function () {
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };
        // 撤销认证
        $rootScope.cancleApproved =function (title, content,refuse ,okFn, cancelFn) {
            var modal = $modal({
                html: true,
                show: false,
                controllerAs:'vm',
                templateUrl: 'views/template/cancleApproved.html',
                controller: function ($scope) {
                    var vm=this;
                    $scope.title = title;
                    $scope.content = content;
                    $scope.ok = function () {
                        refuse.refuse = vm.refuse;
                        typeof okFn == 'function' && okFn();
                        modal.$promise.then(modal.hide);
                    };
                    $scope.cancel = function ($scope) {
                        typeof cancelFn == 'function' && cancelFn();
                        modal.$promise.then(modal.hide);
                    };
                }
            });
            modal.$promise.then(modal.show);
        };


        //认证管理-审核认证信息
        $rootScope.approvedCheck = function (refuse ,okFn,cancelFn) {
          var modal = $modal({
              html:true,
              show:false,
              controllerAs:'vm',
              templateUrl:'views/template/approvedCheck.html',
              controller:function ($scope) {
                  var vm =this;
                  //提交按钮禁用状态
                  vm.statusDis = true;
                  //选择通过拒绝、默认通过
                  vm.checkStatu = "2";
                  vm.ok = function () {
                      //传到服务的交互数据
                      refuse.refuse = vm.rejectReason;
                      refuse.status = vm.checkStatu;
                      if(refuse.status==2) {
                          refuse.refuse="";
                      }
                      typeof okFn == 'function' && okFn();
                      modal.$promise.then(modal.hide);
                  };
                  vm.cancel = function () {
                      typeof cancelFn == 'function' && cancelFn();
                      modal.$promise.then(modal.hide);
                  };
              }
          });
          modal.$promise.then(modal.show);
        };
    });


// Set lazy load module
function lazyLoadConfig($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            {
                name: 'angularFileUpload',
                files: [
                    'vendor/angular-file-upload/angular-file-upload.min.js',
                    'js/directives/ptteng-uploadThumb/ptteng-uploadThumb-0.0.1.js'
                ]
            }, {
                name: 'datepicker',
                files: [
                    'js/directives/datepicker/datepicker.css',
                    'js/directives/datepicker/datepicker.js'
                ]
            }, {
                name: 'dndLists',
                files: [
                    'vendor/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'
                ]
            },
            {
                name: 'page',
                files: [
                    'js/directives/ptteng-paging/pagination.js'
                ]
            },
            {
                name: 'area-selcet',
                files: [
                    "js/directives/area-select/areaConstant.js",
                    "js/directives/area-select/areaSelect.js"
                ]
            },

            //上传文件
            {
                name: 'angularFileUpload',
                files: [
                    'vendor/angular-file-upload/angular-file-upload.min.js',
                    'js/directives/ptteng-uploadThumb/ptteng-uploadThumb-0.0.1.js'
                ]
            },

            //富文本
            {
                name: 'um',
                files: [
                    'vendor/um/umeditor.config.js',
                    'vendor/um/umeditor.min.js',
                    'vendor/um/lang/zh-cn/zh-cn.js',
                    'vendor/um/themes/default/css/umeditor.css'
                ]
            },
            //两个时间选择器
            {
                name:'dateTimePickerSpell',
                files: [
                    'js/directives/dateTimePickerSpell/dateTimePickerSpell.html',
                    'js/directives/dateTimePickerSpell/dateTimePickerSpell.js'
                ]
            },
            {
                name:'dateTimePickerOnly',
                files: [
                    'js/directives/dateTimePickerOnly/dateTimePickerOnly.html',
                    'js/directives/dateTimePickerOnly/dateTimePickerOnly.js'
                ]
            },
            //脑图
            {
                name:'kityminder',
                files:[
                    '/vendor/kityminder-core/kity.js',
                    '/vendor/kityminder-core/kityminder.core.js',
                    '/vendor/kityminder-core/kityminder.core.css',
                    'js/directives/kityminder/kityminder.html',
                    'js/directives/kityminder/kityminder.js'
                ]
            },
            //chartjs
            {
                name:'charjs',
                files: [
                    'js/directives/chartjs/chartjs.js',
                    'vendor/chartjs/echarts.min.js'
                ]
            }
        ]
    });
}

// Loader
function loadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 200;
    cfpLoadingBarProvider.includeSpinner = false;
}


function httpConfig($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };

}

function recordCookies($cookies) {
    return function (params) {
        var cookie = $cookies.records || '{"managerID":"","moduleID":"","targetID":"","operate":""}';
        cookie = JSON.parse(cookie);

        if (params) {
            var setCookies = {
                managerID: params.managerID || cookie.managerID,
                moduleID: params.moduleID || cookie.moduleID,
                operate: params.operate || cookie.operate,
                roleID: params.roleID || cookie.roleID,
                targetID: +params.targetID || cookie.targetID
            };

            if (params.operate == "POST") {
                delete setCookies.targetID;
            }
            $cookies.records = JSON.stringify(setCookies);
        } else {
            return cookie;
        }

    }
}