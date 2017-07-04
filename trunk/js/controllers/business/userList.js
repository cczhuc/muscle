angular.module('admin').controller('UserListCtrl',['$state','$http','portService',
    function($state,$http,portService) {

        var vm = this;
        vm.data = $state.params;
        portService.getUserList(vm.data).then(function (res){
            if (res.data.code===0) {
                console.log(res);

            }

        })
    }
]);
