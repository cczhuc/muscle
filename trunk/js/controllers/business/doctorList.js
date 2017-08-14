angular.module('admin').controller('DoctorListCtrl',['$rootScope','$state','$http','portService','commonUtil',
    function($rootScope,$state,$http,portService,commonUtil) {
        var vm = this;
        //把需要日历插件+86399999的参数的名字以字符串放进来，写在html中search指令的属性里，给search指令去处理
        vm.timeFixArr = ["registerTo"];
        vm.searchParams = $state.params;
        vm.searchParams.registerFrom = parseInt(vm.searchParams.registerFrom) || undefined;
        vm.searchParams.registerTo = parseInt(vm.searchParams.registerTo) || undefined;

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
        vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/

            vm.tempParams = angular.copy(vm.searchParams);
            if(vm.tempParams.registerFrom - 1 >= vm.tempParams.registerTo) {
                var tempAt = vm.tempParams.registerFrom;
                //搜索按钮指令会对vm.searchParams.end + 86400000 -1,所以要反向操作
                vm.tempParams.registerFrom = vm.tempParams.registerTo - 86400000 + 1;
                vm.tempParams.registerTo = tempAt + 86400000 -1;
            }

        //获取服务器时间
        commonUtil.getServerTime().then(function (res) {

            vm.serviceTime = res;
            //对年龄的处理
            vm.tempParams.ageFrom = parseInt(vm.tempParams.ageFrom) || undefined;
            vm.tempParams.ageTo = parseInt(vm.tempParams.ageTo) || undefined;
            if (vm.tempParams.ageFrom > vm.tempParams.ageTo) {
                var tempAge = vm.tempParams.ageFrom;
                vm.tempParams.ageFrom = vm.tempParams.ageTo;
                vm.tempParams.ageTo = tempAge;
            }
            if (vm.tempParams.ageFrom) {
                vm.tempParams.ageFrom = vm.serviceTime - vm.tempParams.ageFrom * 365 * 24 * 60 * 60 * 1000;
            }
            if (vm.tempParams.ageTo) {
                vm.tempParams.ageTo = vm.serviceTime - ((vm.tempParams.ageTo + 1) * 365 * 24 * 60 * 60 * 1000 - 1);
            }
            var agetemp = vm.tempParams.ageFrom;
            vm.tempParams.ageFrom = vm.tempParams.ageTo;
            vm.tempParams.ageTo = agetemp;
            portService.getDoctorList(vm.tempParams).then(function (res){
                if (res.data.code===0) {
                    vm.userList = res.data.data.userList;
                    vm.doctorList = res.data.data.doctorList;
                    vm.total = res.data.total;
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        });

        vm.freezeUser = function(id,status) {
            if (status === 0) {
                $rootScope.operationConfirm("冻结后该账户不可被使用", "是否执行冻结操作？",function () {
                    portService.changeUserStatus(id).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("修改成功", function () {})
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                });
            } else if (status === 1) {
                $rootScope.operationConfirm("解冻后该账户可继续使用。", "是否执行解冻操作？", function () {
                    portService.changeUserStatus(id).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("解冻成功", function () {})
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                });
            } else {
                $rootScope.alert("status="+status);
            }
        };

        //取消认证
        vm.refuse = {}; //拒绝理由，对应的传参是refuse的引用
        vm.cancelApproved = function (id) {
            $rootScope.cancleApproved("取消实名将删除用户身份及银行卡信息","确认取消？",vm.refuse,function () {
                vm.refuse.status = 4;
                // console.log(vm.refuse);
                // 发送请求取消认证变态并删除信息
                portService.cancelApproved(id,vm.refuse).then(function (res) {
                    $state.go($state.current,{},{reload:true});
                    if(res.data.code==0) {
                        $rootScope.alert("撤销认证成功")
                    }
                    else {
                        $rootScope.alert('取消认证失败,code='+code)
                    }
                })
            });
        };
    }
]);
