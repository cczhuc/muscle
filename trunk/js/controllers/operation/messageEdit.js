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

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.id = $state.params.id;
        if(vm.id !== ''){
            portService.getMessage().then(function(res){
                vm.data = res;
            })
        }
        vm.send = function(){
            if(vm.pick.length === 0){
                $rootScope.alert('请选择发送人群');
                return
            }
            if(vm.data.personType === true){
                if(vm.publishDate === undefined || vm.publishTime === undefined){
                    $rootScope.alert('请选择发送时间')
                }
                vm.data.personType = 1;
                vm.data.publishAt = vm.publishDate.valueOf() + vm.publishTime.valueOf() + 28800000;
                console.log(vm.data.publishAt, vm.publishDate.valueOf(), vm.publishTime.valueOf(), vm.publishTime.valueOf() + 28800000)
            } else {
                vm.data.personType = 0;
                delete vm.data.publishAt;
            }
            if(vm.data.status === true){
                vm.data.status = 1;
            } else {
                vm.data.status = 2;
            }
            if(vm.id===undefined){
                newMessage();
            }else {
                editMessage()
            }
        };
        // 新增信息请求
        function newMessage(){
            portService.postMessage(vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert("认证成功");
                    $state.go($state.current, {}, {reload : true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
        // 编辑信息请求
        function editMessage(){
            portService.postMessage(vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert("认证成功");
                    $state.go($state.current, {}, {reload : true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
        // 全选相关
        vm.pick = [];
        vm.grade = [0, 1, 2, 3, 4];
        vm.doctor = [2, 3, 4];
        vm.checkAll = function(){
            console.log(vm.sendAll);
            if(vm.sendAll){
                vm.pick = angular.copy(vm.grade);
            } else {
                vm.pick = [];
            }
        };
        // 选择所有医师
        vm.checkDoctor = function(){
            console.log(vm.sendAll);
            if(vm.allDoctor){
                vm.pick = angular.copy(vm.doctor);
            } else {
                vm.pick = [];
            }
        };
    }

})();

