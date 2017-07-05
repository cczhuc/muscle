angular.module("admin").controller('ApprovedDetailsCtrl',["$rootScope","$state","$http","portService","approvedManage",
    function ($rootScope,$state,$http,portService,approvedManage) {
        var vm = this;
        vm.data = $state.params;
        vm.positionalTitle = approvedManage.positionalTitle;
        // 获取数据
        portService.getApprovedDetails(vm.data.id).then(function (res) {
            if (res.data.code===0) {
                vm.data = res.data.data;
            }
            else {
                $rootScope.alert(res.data.message)
            }
        });
        // 点击审核弹出模态框
        vm.check = function () {
            $rootScope.approvedCheck()
        };
        // 返回
        vm.back =function () {
            $state.go("field.approvedList",{page:1,size:10},{reload:true})
        }

    }]);
