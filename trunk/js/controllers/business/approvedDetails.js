angular.module("admin").controller('ApprovedDetailsCtrl',["$rootScope","$state","$http","portService","approvedManage",
    function ($rootScope,$state,$http,portService,approvedManage) {
        var vm = this;
        vm.data = $state.params;
        vm.positionalTitle = approvedManage.positionalTitle;
        // 获取数据
        portService.getApprovedDetails(vm.data.id).then(function (res) {
            if (res.data.code===0) {
                console.log(res);
                vm.data = res.data.data;
            }
            else {
                $rootScope.alert(res.data.message)
            }
        });
        // 点击审核弹出模态框
        vm.refuse ={};
        vm.check = function () {
            $rootScope.approvedCheck(vm.refuse,function () {
                console.log(vm.refuse);
                // 发送请求取消认证变态并删除信息
                portService.Approvedcheck(vm.data.id,vm.refuse).then(function (res) {
                    if (res.data.code==0) {
                        if(vm.refuse.checkStatu==1) {
                            $rootScope.alert("审核通过");
                        }
                        else {
                            $rootScope.alert("审核拒绝");
                        }
                    }
                    else {
                        $rootScope.alert(res.data.message);
                    }
                })
            });
        };

    }]);
