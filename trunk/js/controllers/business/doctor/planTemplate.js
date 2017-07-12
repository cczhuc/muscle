
angular.module('admin').controller('PlanTemplateCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        //需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.searchParams和$state.params和http请求的params是3个东西，要分清楚
        //vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端
        //要深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。不这样做会导致：eg：输入年龄 55和10，点击搜索后会显示10和55
        vm.tempParams = angular.copy(vm.searchParams);
        if(vm.tempParams.startAt - 1 >= vm.tempParams.endAt) {
            var tempAt = vm.tempParams.startAt;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,所以要反向操作
            vm.tempParams.startAt = vm.tempParams.endAt - 86400000 + 1;
            vm.tempParams.endAt = tempAt + 86400000 -1;
        }

        if(vm.tempParams.minCount>vm.tempParams.maxCount) {
            var tempAge = vm.tempParams.minAge;
            vm.tempParams.minCount = vm.tempParams.maxCount;
            vm.tempParams.maxCount = tempAge;
        }

        portService.planTemplate(vm.tempParams).then(function(res) {
            if(res.data.code === 0) {

                vm.planTemplate = res.data.data;
                console.log(vm.planTemplate.planList);
            } else {
                $rootScope.alert(res.data.message)
            }

        });

    }
]);