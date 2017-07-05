angular.module('admin').controller('UserListCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.getUserList(vm.searchParams).then(function (res){
            if (res.data.code===0) {
                console.log(res);
                vm.userList = res.data.data;
            } else {
                $rootScope.alert(res.data.message);
            }

        });





        vm.freezeUser = function(id,type,status) {
            if (status === 0) {
                $rootScope.operationConfirm("冻结后改账户不可被使用", "是否执行冻结操作？",function () {
                    /*******
                     * 发送冻结请求
                     * *****/
                    $rootScope.alert("冻结成功", function () {})
                });
            }
            else if (status === 1) {
                $rootScope.operationConfirm("解冻后该公司下的信息将可继续使用。", "是否执行解冻操作？", function () {
                      /*******
                       * 发送解冻请求
                       * *************/
                    $rootScope.alert("解冻成功", function () {})

                });
            }
        };

    }
]);
