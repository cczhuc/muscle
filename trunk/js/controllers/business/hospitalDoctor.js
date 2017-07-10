angular.module("admin").controller('HospitalDoctorCtrl',["$rootScope","$state","$http","portService",
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        // 时间格式转换
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        portService.getHospitalDoctor(vm.searchParams.id,vm.searchParams).then(function (res) {
            if (res.data.code==0) {
                console.log(res);
                vm.doctorList = res.data.data.doctorList;
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
