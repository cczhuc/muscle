/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('VersionUpdateCtrl', VersionUpdateCtrl);

    VersionUpdateCtrl.$inject = ['$scope','$state','portService','$rootScope'];

    /* @ngInject */
    function VersionUpdateCtrl($scope,$state,portService,$rootScope){
        var vm = this;
        vm.title = 'VersionUpdateCtrl';
        vm.id = $state.params.id;
        activate();

        ////////////////

        function activate(){
            portService.getVersionDetails(vm.id).then(function(res){
                if(res.data.code ===0){
                    vm.data = res.data.data;
                    vm.data.info = JSON.parse(vm.data.info);
                    vm.data.forceUpdate = 0;
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        }
        vm.send = function(){
            vm.data.info = JSON.stringify(vm.data.info);
            portService.putVersionDetails(vm.id,vm.data).then(function(res){
                if(res.data.code == 0){
                    $rootScope.alert(res.data.message)
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        };
        // 添加版本信息
        vm.addTag = function(){
            vm.data.info.push('');
        };
        // 删除版本信息
        vm.deleteTag = function($index){
            if(vm.data.info.length>1){
                vm.data.info.splice($index,1);
            }else {
                alert('至少有一条信息')
            }
        };
    }

})();

