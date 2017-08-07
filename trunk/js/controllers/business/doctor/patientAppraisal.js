angular.module('admin').controller('PatientAppraisalCtrl', ['$rootScope', '$state', '$http', 'portService',
    function ($rootScope, $state, $http, portService) {
        var vm = this;
        vm.searchParams = $state.params;
        //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html中search指令的属性里，给search指令去处理
        vm.timeFixArr = ["createTo"];
        vm.searchParams.createFrom = parseInt(vm.searchParams.createFrom) || undefined;
        vm.searchParams.createTo = parseInt(vm.searchParams.createTo) || undefined;

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
         vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/
        (function () {
            vm.tempParams = angular.copy(vm.searchParams);
            if (vm.tempParams.createFrom - 1 >= vm.tempParams.createTo) {
                var tempAt = vm.tempParams.createFrom;
                //搜索按钮指令会对vm.searchParams.end + 86400000 -1,所以要反向操作
                vm.tempParams.createFrom = vm.tempParams.createTo - 86400000 + 1;
                vm.tempParams.createTo = tempAt + 86400000 - 1;
                console.log("vm.tempParams.createFrom", vm.tempParams.createFrom);
                console.log("vm.tempParams.createTo", vm.tempParams.createTo);
            }
        }());

        portService.patientAppraisalList(vm.tempParams).then(function (res) {
            if (res.data.code === 0) {
                vm.commentList = res.data.data.commentList;
                vm.userList = res.data.data.userList;
                vm.total = res.data.data.total;
                console.log( vm.commentList);
                console.log( vm.userList);
            } else {
                $rootScope.alert(res.data.message);
            }
        });

        vm.deleteComment = function (id) {
            $rootScope.operationConfirm("删除将同时在前台删除此条评论", "确认删除？", function () {
                portService.deleteComment(id).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go($state.current, {}, {reload: true});
                        $rootScope.alert("删除成功", function () {
                        })
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            });
        };
    }
]);