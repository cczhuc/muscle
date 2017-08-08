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
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        }
        vm.f_info = ['你还','再见','哈哈'];
        // 添加版本信息
        vm.addTag = function(){
            vm.f_info.push('');
        };
        // 删除版本信息
        vm.deleteTag = function($index){
            if(vm.f_info.length>1){
                vm.f_info.splice($index,1);
            }else {
                alert('至少有一条信息')
            }
        };
    }

})();

