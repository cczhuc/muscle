
angular.module('admin').controller('PlanTemplateCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html中search指令的属性里，给search指令去处理
        vm.timeFixArr = ["createTo"];
        vm.searchParams = $state.params;
        vm.searchParams.createFrom = parseInt(vm.searchParams.createFrom) || undefined;
        vm.searchParams.createTo = parseInt(vm.searchParams.createTo) || undefined;

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
         vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/
        vm.tempParams = angular.copy(vm.searchParams);
        if(vm.tempParams.createFrom - 1 >= vm.tempParams.createTo) {
            var tempAt = vm.tempParams.createFrom;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,所以要反向操作
            vm.tempParams.createFrom = vm.tempParams.createTo - 86400000 + 1;
            vm.tempParams.createTo = tempAt + 86400000 -1;
        }

        if(vm.tempParams.countFrom>vm.tempParams.countTo) {
            var tempAge = vm.tempParams.ageFrom;
            vm.tempParams.countFrom = vm.tempParams.countTo;
            vm.tempParams.countTo = tempAge;
        }

        portService.planTemplate(vm.tempParams).then(function(res) {
            if(res.data.code === 0) {
                // console.log("res.data",res.data);
                vm.templateList = res.data.data.templateList;
                // vm.templateList = res.data.data;
                vm.total = res.data.total;
            } else {
                $rootScope.alert(res.data.message)
            }

        });

    }
]);