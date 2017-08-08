/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageListCtrl', MessageListCtrl);

    MessageListCtrl.$inject = ['$rootScope', 'portService', '$state'];

    /* @ngInject */
    function MessageListCtrl($rootScope, portService, $state){
        var vm = this;
        vm.title = 'MessageListCtrl';


        ////////////////
        vm.searchParams = $state.params;
        vm.timeFixArr = ['endAt'];
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        portService.getMessageList(vm.searchParams).then(function(res){
            vm.message = res.data.data;
            vm.total = res.data.total;
            console.log(vm.message);
        });
        vm.send = function($index){
            $rootScope.operationConfirm('立即发送将取消定时发送并立即发送消息', '确认发送？', function(){

            })
        };
        vm.delete = function($index){
            $rootScope.operationConfirm('删除将在前台同步删除消息', '确认删除？', function(){
                portService.deleteMessage(vm.message[$index].id).then(function(res){
                    if(res.data.code == 0){
                        $rootScope.alert(res.data.message);
                        $state.go($state.current, vm.searchParams, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            })
        }
    }

})();

