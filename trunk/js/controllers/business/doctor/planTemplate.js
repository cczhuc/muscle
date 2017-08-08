
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

        //通过医师详情接口获取姓名
        portService.getDoctorDetails(vm.searchParams.did).then(function (res){
            if(res.data.code === 0) {
                vm.detailData = res.data.data;
            } else {
                $rootScope.alert(res.data.message);
            }
        });



        // 清空搜索
        vm.clean = function () {
            angular.forEach(vm.searchParams, function (data, index) {
                //三期添加了关于ID的选项，清除的时候不能清除ID
                if (index !=='dName' && index !=='did' ) {
                    vm.searchParams[index] = '';
                }
            });
            // $state.go($state.current, commonUtil.querySearchParams(vm.searchParams), {reload: true});
            $state.go($state.current, vm.searchParams, {reload: true});
        };


        vm.search = function() {
            if (vm.searchParams.page) {
                vm.searchParams.page = 1;
            }


            $state.go($state.current, vm.searchParams, {reload: true});

        };


        // vm.tempParams = angular.copy(vm.searchParams);
        // if(vm.tempParams.createFrom - 1 >= vm.tempParams.createTo && vm.tempParams.createTo) {
        //     var tempAt = vm.tempParams.createFrom;
        //     //搜索按钮插件会对vm.searchParams.end + 86400000 -1,所以要反向操作
        //     vm.tempParams.createFrom = vm.tempParams.createTo;
        //     vm.tempParams.createTo = tempAt + 86400000 -1;
        // }
        //
        // if(vm.tempParams.countFrom>vm.tempParams.countTo && vm.tempParams.countFrom || vm.tempParams.countTo) {
        //     var tempAge = vm.tempParams.countFrom;
        //     vm.tempParams.countFrom = vm.tempParams.countTo;
        //     vm.tempParams.countTo = tempAge;
        //     vm.tempParams.countFrom= parseInt( vm.tempParams.countFrom);
        //     vm.tempParams.countTo= parseInt( vm.tempParams.countTo);
        //     console.log("vm.tempParams.countFrom",vm.tempParams.countFrom);
        //     console.log("vm.tempParams.countTo",vm.tempParams.countTo);
        // }
        portService.planTemplate(vm.tempParams).then(function(res) {
            console.log("vm.tempParams",vm.tempParams);
            if(res.data.code === 0) {
                // console.log("res.data",res.data);
                // vm.templateList = res.data.data.templateList;
                vm.templateList = res.data.data;
                // vm.templateList = res.data.data;
                vm.total = res.data.total;
            } else {
                $rootScope.alert(res.data.message)
            }

        });

    }
]);

