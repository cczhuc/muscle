angular.module("admin").controller('HospitalDoctorCtrl',["$rootScope","$state","$http","portService",
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

        portService.getHospitalDoctor(vm.tempParams.id).then(function (res) {
            if (res.data.code==0) {
                console.log(res);
                vm.doctorList = res.data.data.doctorList;
                vm.hospitalName = res.data.data.hospitalName;
                vm.total = res.data.data.total;
            }
            else {
                $rootScope.alert(res.data.message)
            }
        });
        vm.refuse ={};
        // 撤销认证
        vm.cancelApproved = function (id) {
            $rootScope.cancleApproved("取消实名将删除用户身份及银行卡信息","确认取消？",vm.refuse,function () {
                console.log(vm.refuse);
                // 发送请求取消认证变态并删除信息
                portService.cancelApproved(id).then(function (res) {
                    if(res.data.code==0) {

                        $rootScope.alert("取消成功")
                    }
                    else {
                        $rootScope.alert("取消失败")
                    }
                })
            });
        };
        // 冻结或者解冻
        vm.freezeDoctor = function(id,type,status) {
            if (status === 0) {
                $rootScope.operationConfirm("冻结后将禁止用户登录App", "确认冻结?",function () {
                    portService.changeUserStatus(id,type,1).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("冻结成功", function () {})
                        }
                    })

                });
            }
            else if (status === 1) {
                $rootScope.operationConfirm("解冻后将恢复用户登录权限", "确认解冻？", function () {
                    portService.changeUserStatus(id,type,0).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("解冻成功", function () {})
                        }
                    })
                });
            }
        };
    }
]);
