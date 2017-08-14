angular.module("admin").controller('HospitalListCtrl',["$rootScope","$scope","$state","$http","portService","hospitalGrade","commonUtil",
    function ($rootScope,$scope,$state,$http,portService,hospitalGrade,commonUtil) {
        var vm = this;
        /**获取常量表数据**/
        var data ={size:1000};
        vm.selectData = portService.getParamList(data);

        vm.searchParams = $state.params;
        vm.hospitalGrade = hospitalGrade;
        //需求：对输入范围的左边和右边的大小不限。  但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.tempParams是vm.searchParams的深拷贝，处理好数据后发送给后端
        //深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。
        vm.tempParams = angular.copy(vm.searchParams);
        if(vm.tempParams.totalFrom>vm.tempParams.totalTo) {
            var tempNum = vm.tempParams.totalFrom;
            vm.tempParams.totalFrom = vm.tempParams.totalTo;
            vm.tempParams.totalTo = tempNum;
        }
        // 省市区数据转换
        vm.searchParams.address1 = commonUtil.areaDateTransform($state.params.province, $state.params.city, $state.params.county);
        // 获取常量表
        portService.getParamList(data).then(function (res) {
            if (res.data.code==0) {
                var areaData = commonUtil.areaDataFilter(res.data.data);
                // 获取常量数据并将省、市过滤
                portService.gerHospitalList(vm.tempParams).then(function (res) {
                    if (res.data.code==0) {
                        vm.hospitalList = res.data.data;
                        vm.total = res.data.total;
                        angular.forEach(areaData.provinces, function (item) {
                            for (var i=0;i<vm.hospitalList.length;i++) {
                                if (item.id == vm.hospitalList[i].province) {
                                    vm.hospitalList[i].province = item.name;
                                }
                            }
                        });
                        angular.forEach(areaData.cities, function (item) {
                            for (var i=0;i<vm.hospitalList.length;i++) {
                                if (item.id == vm.hospitalList[i].city) {
                                    vm.hospitalList[i].city = item.name;
                                }
                            }
                        });
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                });
            }
            else {
                $rootScope.alert(res.data.message)
            }
        });



        // 上下线
        vm.onOffLine = function(id,type,status) {
            if (status === 0) {
                $rootScope.operationConfirm("下线将使前台不再展示此医院", "确认下线？",function () {
                    portService.changeHospitalStatus(id,type,1).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("下线成功")
                        }
                    })

                });
            }
            else if (status === 1) {
                $rootScope.operationConfirm("上线将在前台展示此医院", "确认上线？", function () {
                    portService.changeHospitalStatus(id,type,0).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("上线成功")
                        }
                    })
                });
            }
        };
    }
]);
