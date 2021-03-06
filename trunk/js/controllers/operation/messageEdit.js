/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageEditCtrl', MessageEditCtrl);

    MessageEditCtrl.$inject = ['$rootScope', 'portService','$state'];

    /* @ngInject */
    function MessageEditCtrl($rootScope, portService,$state){
        var vm = this;
        vm.title = 'MessageEditCtrl';
        vm.id = $state.params.id;
        if(vm.id !== ''){
            portService.getMessageDetails(vm.id).then(function(res){
                vm.data = res.data.data;
            })
        }
        vm.save = function(){
            alert(vm.data.personType);
        };
        vm.send = function(status){
            if(vm.data.personType === undefined){
                $rootScope.alert('请选择发送人群');
                return
            }
            if(vm.data.type === true){
                if(vm.publishDate === undefined || vm.publishTime === undefined){
                    $rootScope.alert('请选择发送时间')
                }
                vm.data.type = 2;
                vm.data.pushAt = vm.publishDate.valueOf() + vm.publishTime.valueOf() + 28800000;
            } else {
                vm.data.type = 2;
                delete vm.data.pushAt;
            }
            if(vm.data.notice_status == true&& vm.data.notice_status!==0){
                vm.data.notice_status = 1
            }else(vm.data.notice_status = 0);
            vm.data.status = status;
            if(vm.id==''){
                newMessage();
            }else {
                editMessage()
            }
        };
        // 新增信息请求
        function newMessage(){
            portService.postMessage(vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert("发送成功");
                    history.go(-1);
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
        // 编辑信息请求
        function editMessage(){
            portService.postMessage(vm.id,vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert("发送成功");
                    history.go(-1);
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
    }

})();

