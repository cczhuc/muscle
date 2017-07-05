/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('VersionUpdateCtrl', VersionUpdateCtrl);

    VersionUpdateCtrl.$inject = ['$scope'];

    /* @ngInject */
    function VersionUpdateCtrl($scope){
        var vm = this;
        vm.title = 'VersionUpdateCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.f_info = ['你还','再见','哈哈'];
        // 添加版本信息
        vm.addTag = function(){
            vm.f_info.push('a');
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

