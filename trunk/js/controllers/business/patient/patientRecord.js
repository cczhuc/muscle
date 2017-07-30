angular.module('admin').controller('PatientRecordCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html日期插件的属性里，给search插件去处理
        vm.timeFixArr = ["payEndAt"];
        // 时间格式转换
        vm.searchParams.payStartAt = parseInt(vm.searchParams.payStartAt) || undefined;
        vm.searchParams.payEndAt = parseInt(vm.searchParams.payEndAt) || undefined;
        //需求：对输入范围的左边和右边的大小不限。  但是在发送数据的时候要对这些倒过来的参数进行处理
        //vm.tempParams是vm.searchParams的深拷贝，处理好数据后发送给后端
        //深拷贝,直接等的话是浅拷贝，在页面上显示会有问题。
        vm.tempParams = angular.copy(vm.searchParams);

        if(vm.tempParams.payStartAt - 1 >= vm.tempParams.payEndAt) {
            var tempAt = vm.tempParams.payStartAt;
            //搜索按钮插件会对vm.searchParams.end + 86400000 -1,如果界面所以要反向操作
            vm.tempParams.payStartAt = vm.tempParams.payEndAt - 86400000 + 1;
            vm.tempParams.payEndAt = tempAt + 86400000 -1;
        }

        if(vm.tempParams.amountStart>vm.tempParams.amountEnd) {
            var tempSum = vm.tempParams.amountStart;
            vm.tempParams.amountStart = vm.tempParams.amountEnd;
            vm.tempParams.amountEnd = tempSum;
        }

        portService.getPatientRecord(vm.tempParams.id).then(function (res) {
            if(res.data.code==0) {
                console.log(res);
                vm.patientRecord = res.data.data;
                vm.total = res.data.total;
            }
            else {
                $rootScope.alert(res.data.message)
            }

        })
    }
]);
