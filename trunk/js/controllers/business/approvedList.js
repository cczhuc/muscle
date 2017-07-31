angular.module("admin").controller('ApprovedListCtrl',["$rootScope","$state","$http","portService",
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html日期插件的属性里，给search插件去处理
        vm.timeFixArr = ["applyTo"];
        // 时间格式转换
        vm.searchParams.applyFrom = parseInt(vm.searchParams.applyFrom) || undefined;
        vm.searchParams.applyTo = parseInt(vm.searchParams.applyTo) || undefined;
        //需求：对输入范围的左边和右边的大小不限。  但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.tempParams是vm.searchParams的深拷贝，处理好数据后发送给后端
        //深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。
        vm.tempParams = angular.copy(vm.searchParams);

        if(vm.tempParams.applyFrom - 1 >= vm.tempParams.applyTo) {
            var tempAt = vm.tempParams.applyFrom;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
            vm.tempParams.applyFrom = vm.tempParams.applyTo - 86400000 + 1;
            vm.tempParams.applyTo = tempAt + 86400000 -1;
        }

        portService.getApprovedList(vm.tempParams).then(function (res){
            if (res.data.code===0) {
                for (var i=0;i<res.data.data.doctorList.length;i++) {
                    Object.assign(res.data.data.doctorList[i],res.data.data.userList[res.data.data.doctorList[i].id])
                }
                vm.approvedList = res.data.data.doctorList;
                console.log(vm.approvedList);
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
                portService.cancelApproved(id,vm.refuse).then(function (res) {
                    if (res.data.code===0) {
                        if(vm.refuse.status===0) {
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
