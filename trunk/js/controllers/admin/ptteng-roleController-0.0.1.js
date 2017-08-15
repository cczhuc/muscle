'use strict';
angular.module('admin')
    .controller('RoleCtrl', ['$state', '$scope', '$rootScope', 'commonUtil', 'roleService',RoleCtrl]);
        function RoleCtrl($state, $scope, $rootScope, commonUtil, roleService) {

        var vm = $scope.vm = {};
        vm.id = $state.params.ids;
        roleService.getRoleList().then(function (res) {
            if (res.data.code == 0) {
                roleService.batchGetRole(res.data.data.rids).then(function (res) {
                    if (res.data.code == 0) {
                        vm.total = res.data.data.total;
                        vm.list = res.data.data.roleList;
                    } else {
                        commonUtil.showErrMsg(res);
                    }
                });

            } else {
                commonUtil.showErrMsg(res);
            }
        });
        vm.delete = function (id) {

            $rootScope.confirm("您确定要删除吗？", function () {
                roleService.deleteRole(id).then(function (res) {

                    commonUtil.showReturnMsg(res, "field.role");

                });
            });

        };
    }
