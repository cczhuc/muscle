angular.module("admin").controller('ApprovedListCtrl',["$rootScope","$state","$http","portService",
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        // 时间格式转换
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        portService.getApprovedList(vm.searchParams).then(function (res){
            if (res.data.code===0) {
                console.log(res);
                vm.approvedList = res.data.data.approvedList;
                vm.total = res.data.data.total;
            }
            else {
                $rootScope.alert(res.data.message)
            }
        });
        // 审核
        vm.refuse ={};
        vm.check =function (id) {
            $rootScope.approvedCheck(vm.refuse,function () {
                console.log(vm.refuse);
                // 发送请求审核
                portService.Approvedcheck(id,vm.refuse).then(function (res) {
                    if (res.data.code==0) {
                        if(vm.refuse.checkStatu==1) {
                            $rootScope.alert("审核通过");
                        }
                        else {
                            $rootScope.alert("审核拒绝");
                        }
                    }
                    else {
                        $rootScope.alert(res.data.message);
                    }
                })

            })
        }


}]);
