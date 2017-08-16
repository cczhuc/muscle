/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('OpinionListCtrl', OpinionListCtrl);

    OpinionListCtrl.$inject = ['portService','$rootScope','$state'];

    /* @ngInject */
    function OpinionListCtrl(portService,$rootScope,$state){
        var vm = this;
        vm.title = 'OpinionListCtrl';

        vm.searchParams = $state.params;
        vm.timeFixArr = ['endAt'];
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt)  || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt)  || undefined;
        vm.tempParams = angular.copy(vm.searchParams);

        if(vm.tempParams.startAt - 1 >= vm.tempParams.endAt){
            var tempAt = vm.tempParams.applyFrom;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
            vm.tempParams.applyFrom = vm.tempParams.applyTo - 86400000 + 1;
            vm.tempParams.applyTo = tempAt + 86400000 - 1;
        }
        function activate(){
            portService.getOpinionList(vm.tempParams).then(function(res){
                if(res.data.code == 0){
                    vm.data = res.data.data.list;
                    vm.total = res.data.data.total;
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        }
        activate();
        // 删除
        vm.delete = function($index){
            $rootScope.operationConfirm('删除将在列表删除此条记录', '确认删除？', function(){
                portService.OpinionDelete(vm.data[$index].id).then(function(res){
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

