angular.module("admin").controller('ApprovedListCtrl',["$rootScope","$state","$http","portService",
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.data = $state.params;
        portService.getApprovedList(vm.data).then(function (res){
            if (res.data.code===0) {
                console.log(res);
                vm.approvedList = res.data.data.approvedList;
                vm.total = res.data.data.total;
            }
            else {
                $rootScope.alert(res.data.message)
            }

        })

}]);
