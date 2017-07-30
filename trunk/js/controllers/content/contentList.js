/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentListCtrl', ContentListCtrl);

    ContentListCtrl.$inject = ['$scope', 'portService', '$rootScope', '$timeout', '$state'];

    /* @ngInject */
    function ContentListCtrl($scope, portService, $rootScope, $timeout, $state){
        var vm = this;
        vm.title = 'ContentListCtrl';
        vm.searchParams = $state.params;
        // vm.timeFixArr = ["applyTo"];
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;

        //vm.tempParams = angular.copy(vm.searchParams);

        // if(vm.tempParams.startAt - 1 >= vm.tempParams.endAt){
        //     var tempAt = vm.tempParams.applyFrom;
        //     //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
        //     vm.tempParams.applyFrom = vm.tempParams.applyTo - 86400000 + 1;
        //     vm.tempParams.applyTo = tempAt + 86400000 - 1;
        // }
        // if(vm.searchParams.startAt === vm.searchParams.endAt){
        //     vm.searchParams.endAt = vm.searchParams.endAt + 86399999;
        // }
        console.log(vm.searchParams.endAt);
        portService.getContentList(vm.searchParams).then(function(res){
            vm.total = res.data.data.total;
            vm.content = res.data.data.articleList;
            console.log(vm.content)
        });

        // 拖动部分
        vm.sort = function(){
            $scope.sortableOptions.disabled = false;
        };
        vm.save = function(){
            if(vm.resArr == undefined){
                $rootScope.alert('请先进行排序')
            } else {
                $scope.sortableOptions.disabled = true;
                portService.putSort(vm.resArr).then(function(res){
                    if(res.data.code === 0){
                        $rootScope.alert(res.data.message)
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        };
        // 成功拖动
        $scope.cannotSort = false;
        $scope.sortableOptions = {
            // 数据有变化
            update : function(e, ui){
                //需要使用延时方法，否则会输出原始数据的顺序，可能是BUG？
                $timeout(function(){
                    vm.resArr = [];
                    for(var y = 0; y < vm.content.length; y++){
                        vm.resArr.push(vm.content[y].id);
                    }
                    console.log(vm.resArr);
                })
            },
            disabled : true
        };
        // 操作部分
        vm.offline = function($index){
            $rootScope.operationConfirm('下线将使前台不再展示此内容', '确认下线？', function(){
                portService.putContentStatus(vm.content[$index].id, {status : 2}).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current, vm.searchParams, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            })
        };
        vm.online = function($index){
            $rootScope.operationConfirm('上线将在前台展示此内容', '确认上线？', function(){
                portService.putContentStatus(vm.content[$index].id, {status : 1}).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current, vm.searchParams, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            })
        };
        vm.delete = function($index){
            $rootScope.operationConfirm('删除将自动下线此内容', '确认删除？', function(){
                portService.deleteContent(vm.content[$index].id).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current, vm.searchParams, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
            })
        };
    }

})();

