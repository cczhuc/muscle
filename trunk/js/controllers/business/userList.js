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

        }


    }
]);
