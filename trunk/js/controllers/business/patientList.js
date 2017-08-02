angular.module('admin').controller('PatientListCtrl', ['$rootScope','$scope', '$state', '$http', 'portService', 'commonUtil',
    function ($rootScope, $scope, $state, $http, portService,commonUtil) {
        var vm = this;
        vm.timeFixArr = ["registerTo"]; //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html中search指令的属性里，给search指令去处理
        vm.searchParams = $state.params;
        vm.parseInt = function (a) {
            return parseInt(a);
        };
        //获取服务器时间
        commonUtil.getServerTime().then(function (res) {
            vm.serviceTime = res;
        });

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
         vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/
        (function () {
            vm.searchParams.registerFrom = parseInt(vm.searchParams.registerFrom) || undefined;
            vm.searchParams.registerTo = parseInt(vm.searchParams.registerTo) || undefined;
            vm.tempParams = angular.copy(vm.searchParams);

            //对时间范围的处理
            if (vm.tempParams.registerFrom - 1 >= vm.tempParams.registerTo) {
                var tempAt = vm.tempParams.registerFrom;
                //搜索按钮指令会对vm.searchParams.end + 86400000 -1,所以要反向操作
                vm.tempParams.registerFrom = vm.tempParams.registerTo - 86400000 + 1;
                vm.tempParams.registerTo = tempAt + 86400000 - 1;
            }
            //对年龄的处理
            if (vm.tempParams.ageFrom > vm.tempParams.ageTo) {
                var tempAge = vm.tempParams.ageFrom;
                vm.tempParams.ageFrom = vm.tempParams.ageTo;
                vm.tempParams.ageTo = tempAge;
        }
        }());

        // 请求用户数据,不要用vm.searchParams，用中间层vm.tempParams
        portService.getPatientList(vm.tempParams).then(function (res) {
            if (res.data.code === 0) {
                vm.userList = res.data.data;
                console.log("vm.userList",vm.userList);
                /*后端给的数据格式有问题*/
                // $scope.user = vm.userList; //等数据好了删掉
                vm.total = res.data.total;
            } else {
                $rootScope.alert(res.data.message);
            }
        });

        //冻结解冻患者
        vm.freezeUser = function (id,status) {
            if (status === 0) {
                $rootScope.operationConfirm("冻结后该账户不可被使用", "是否执行冻结操作？", function () {
                    portService.changeUserStatus(id).then(function (res) {
                        if (res.data.code === 0) {
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("修改成功", function () {
                            })
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    })

                });
            } else if (status === 1) {
                $rootScope.operationConfirm("解冻后该账户可继续使用。", "是否执行解冻操作？", function () {
                    portService.changeUserStatus(id).then(function (res) {
                        if (res.data.code === 0) {
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("解冻成功", function () {
                            })
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                });
            } else {
                $rootScope.alert("status="+status);
            }
        };

        // //跳到用户详情页
        // vm.goUserDetail = function (id, app) {
        //     if (app === 0)
        //         $state.go("field.patientDetails", {id: id}, {reload: true});
        //     else if (app === 1)
        //         $state.go("field.doctorDetails", {id: id}, {reload: true});
        // };

        //取消认证
        vm.refuse = {}; //拒绝理由，对应的传参是refuse的引用
        vm.cancelApproved = function (id) {
            $rootScope.cancleApproved("取消实名将删除用户身份及银行卡信息", "确认取消？", vm.refuse, function () {
                // console.log(vm.refuse);
                // 发送请求取消认证变态并删除信息
                portService.cancelApproved(id).then(function (res) {
                    if (res.data.code == 0) {

                        $rootScope.alert("取消成功")
                    }
                    else {
                        $rootScope.alert("取消失败")
                    }
                })
            });

        };
    }
]);