'use strict';
angular.module('admin')
    .controller('ModuleCtrl', [ '$scope', '$rootScope', 'commonUtil', 'moduleService' ,ModuleCtrl]);
        function ModuleCtrl( $scope, $rootScope, commonUtil, moduleService) {
        var vm = $scope.vm = {};
        moduleService.getModuleList().then(function (res) {
            if (res.data.code == 0) {

                vm.next = res.data.data.next;
                vm.total = res.data.data.total;
                moduleService.batchGetModule(res.data.data.ids).then(function(res){
                    vm.list = res.data.data.moduleList;
                })
            } else {
                commonUtil.showErrMsg(res);
            }
        });


        vm.delete = function (id) {
            $rootScope.confirm("您确定要删除吗？", function () {
                moduleService.deleteModule(id).then(function (res) {
                    commonUtil.showReturnMsg(res, "field.module");
                });
            });

        };
    }