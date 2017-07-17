/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageListCtrl', MessageListCtrl);

    MessageListCtrl.$inject = ['$rootScope','portService','$state'];

    /* @ngInject */
    function MessageListCtrl($rootScope,portService,$state){
        var vm = this;
        vm.title = 'MessageListCtrl';

        activate();

        ////////////////

        function activate(){
            vm.searchParams = {
                startAt : $state.params.startAt || ''
            };
            if(vm.searchParams.startAt === vm.searchParams.endAt){
                vm.searchParams.endAt + 86399;
                console.log(vm.searchParams.endAt);
            }
            portService.getMessageList().then(function(res){
                vm.message = res.data.data.messageList;
                vm.total = res.data.data.total;
                console.log(vm.message)
            })
        }
        vm.send = function($index){
            $rootScope.operationConfirm('立即发送将取消定时发送并立即发送消息','确认发送？',function(){
                $rootScope.alert('发送成功！')
            })
        };
        vm.delete = function($index){
            $rootScope.operationConfirm('删除将在前台同步删除消息','确认删除？',function(){
                $rootScope.alert('删除成功');
            })
        }
    }

})();

