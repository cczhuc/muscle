angular.module("admin").controller('HospitalListCtrl',["$rootScope","$state","$http","portService","hospitalGrade","commonUtil",
    function ($rootScope,$state,$http,portService,hospitalGrade,commonUtil) {
        var vm = this;
        vm.searchParams = $state.params;
        vm.hospitalGrade = hospitalGrade;
        // 省市区数据转换
        vm.searchParams.address = commonUtil.areaDateTransform($state.params.province, $state.params.city, $state.params.county);
        portService.gerHospitalList(vm.searchParams).then(function (res) {
                if (res.data.code==0) {
                    console.log(res);
                    vm.hospitalList = res.data.data.hospitalList;
                    vm.total = res.data.data.total;
                }
                else {
                    $rootScope.alert(res.data.message)
                }
        });
        // 上下线
        vm.onOffLine = function(id,type,status) {
            if (status === 1) {
                $rootScope.operationConfirm("下线将使前台不再展示此医院", "确认下线？",function () {
                    portService.changeHospitalStatus(id,type,2).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("下线成功")
                        }
                    })

                });
            }
            else if (status === 2) {
                $rootScope.operationConfirm("上线将在前台展示此医院", "确认上线？", function () {
                    portService.changeHospitalStatus(id,type,1).then(function(res) {
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
