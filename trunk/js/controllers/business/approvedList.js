angular.module("admin").controller('ApprovedListCtrl',["$state","$http","portService",
function ($state,$http,portService) {
    var vm = this;
    vm.data = $state.params;
    portService.getApprovedList(vm.data).then(function (res){
        if (res.data.code===0) {
            console.log(res);
            vm.approvedList = res.data.data.approvedList;
            vm.total = res.data.data.total;
        }

    })

}]);
