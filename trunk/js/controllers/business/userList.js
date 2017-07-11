angular.module('admin').controller('UserListCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.getUserList(vm.searchParams).then(function (res){
            if (res.data.code===0) {
                console.log(res);
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
