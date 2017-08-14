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
                    vm.info = angular.copy(vm.data.info);
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        }
        vm.send = function(){
            vm.data.info = JSON.stringify(vm.info);
            portService.putVersionDetails(vm.id,vm.data).then(function(res){
                if(res.data.code == 0){
                    $rootScope.alert(res.data.message);
                    $state.go("field.versionManagement", vm.searchParams, {reload : true})
                }else{
                    $rootScope.alert(res.data.message);
                }
            })
        };
        // 添加版本信息
        vm.addTag = function(){
            vm.info.push('');
        };
        // 删除版本信息
        vm.deleteTag = function($index){
            if(vm.info.length>1){
                vm.info.splice($index,1);
            }else {
                alert('至少有一条信息')
            }
        };
    }

})();

