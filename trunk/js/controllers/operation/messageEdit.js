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
            portService.getMessage().then(function(res){
                vm.data = res;
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
                vm.data.publishAt = vm.publishDate.valueOf() + vm.publishTime.valueOf() + 28800000;
                console.log(vm.data.publishAt, vm.publishDate.valueOf(), vm.publishTime.valueOf(), vm.publishTime.valueOf() + 28800000)
            } else {
                vm.data.type = 1;
                delete vm.data.publishAt;
            }
            if(vm.data.status === true){
                vm.data.status = 2;
            } else {
                vm.data.status = status;
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
                    $rootScope.alert("发送成功");
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
                    $rootScope.alert("发送成功");
                    $state.go($state.current, {}, {reload : true});
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
    }

})();

