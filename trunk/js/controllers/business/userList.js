angular.module('admin').controller('UserListCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;

        //需求：对输入范围的左边和右边的大小不限。  但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.searchParams和$state.params和http请求的params是3个东西，要分清楚
        //vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端
        //深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。不这样做会导致：eg：输入年龄 55和10，点击搜索后会显示10和55
        vm.tempParams = JSON.parse(JSON.stringify(vm.searchParams));

        if(vm.tempParams.startAt && vm.tempParams.endAt && vm.tempParams.startAt - 1 >= vm.tempParams.endAt) {
            var tempAt = vm.tempParams.startAt;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
            vm.tempParams.startAt = vm.tempParams.endAt - 86400000 + 1;
            vm.tempParams.endAt = tempAt + 86400000 -1;
        }

        if(vm.tempParams.minAge && vm.tempParams.maxAge && vm.tempParams.minAge>vm.tempParams.maxAge) {
            var tempAge = vm.tempParams.minAge;
            vm.tempParams.minAge = vm.tempParams.maxAge;
            vm.tempParams.maxAge = tempAge;
        }

        // console.log("vm.tempParams",vm.tempParams);

        // 请求用户数据,不要用vm.searchParams，用中间层vm.tempParams
        portService.getUserList(vm.tempParams).then(function (res){
            if (res.data.code===0) {
                // console.log(res);
                vm.userList = res.data.data;
                vm.total = res.data.total;
            } else {
                $rootScope.alert(res.data.message);
            }
        });

        vm.freezeUser = function(id,type,status) {
            if (status === 0) {
                $rootScope.operationConfirm("冻结后该账户不可被使用", "是否执行冻结操作？",function () {

                    portService.changeUserStatus(id,type,1).then(function(res) {
                        if(res.data.code === undefined){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("修改成功", function () {})
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    })

                });
            }
            else if (status === 1) {
                $rootScope.operationConfirm("解冻后该账户可继续使用。", "是否执行解冻操作？", function () {
                    portService.changeUserStatus(id,type,0).then(function(res) {
                        if(res.data.code === 0){
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("解冻成功", function () {})
                        }
                    })


                });
            }
        };

        //跳到用户详情页
        vm.goUserDetail = function(id,app) {
            if(app === 0)
                $state.go("field.patientDetails",{id:id},{reload:true});
            else if(app===1)
                $state.go("field.doctorDetails",{id:id},{reload:true});
        };

        //取消认证
        vm.refuse = {}; //拒绝理由，对应的传参是refuse的引用
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

    }
]);
