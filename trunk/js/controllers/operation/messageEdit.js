/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageEditCtrl', MessageEditCtrl);

    MessageEditCtrl.$inject = ['$rootScope'];

    /* @ngInject */
    function MessageEditCtrl($rootScope){
        var vm = this;
        vm.title = 'MessageEditCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.f_send = function(){
            alert(vm.pick);
            $rootScope.confirm("认证后该公司将被标记为推荐公司sss。", "是否执行认证操作sss？", function () {
                // 发送认证请求
                infoManagementService.changeCompanyStatus(id, type, 1).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go($state.current, {}, {reload: true});
                        $rootScope.alert("认证成功", function () {
                        });
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            });
        };
        vm.pick = [];
        vm.send = [0,1,2,3,4];
        vm.doctor = [2,3,4];
        vm.checkAll = function() {
            console.log(vm.sendAll);
            if(vm.sendAll){
                vm.pick = angular.copy(vm.send);
            }else{
                vm.pick = [];
            }
        };
        vm.checkDoctor = function() {
            console.log(vm.sendAll);
            if(vm.allDoctor){
                vm.pick = angular.copy(vm.doctor);
            }else{
                vm.pick = [];
            }
        };
    }

})();

