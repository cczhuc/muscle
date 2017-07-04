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
        }
    }

})();

