angular.module("admin").controller('ApprovedListCtrl',["$rootScope","$state","$http","portService",
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        // 时间格式转换
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        //需求：对输入范围的左边和右边的大小不限。  但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.tempParams是vm.searchParams的深拷贝，处理好数据后发送给后端
        //深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。
        vm.tempParams = angular.copy(vm.searchParams);

        if(vm.tempParams.startAt - 1 >= vm.tempParams.endAt) {
            var tempAt = vm.tempParams.startAt;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
            vm.tempParams.startAt = vm.tempParams.endAt - 86400000 + 1;
            vm.tempParams.endAt = tempAt + 86400000 -1;
        }

        portService.getApprovedList(vm.tempParams).then(function (res){
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
