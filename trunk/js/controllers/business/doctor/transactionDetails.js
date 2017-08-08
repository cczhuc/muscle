angular.module('admin').controller('TransactionDetailsCtrl',['$rootScope','$state','$http','portService',
    function($rootScope, $state, $http, portService) {
        var vm = this;
        vm.searchParams = $state.params;
        vm.timeFixArr = ["payEndAt"];

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
         vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/
        (function () {
            vm.searchParams.payStartAt = parseInt(vm.searchParams.payStartAt) || undefined;
            vm.searchParams.payEndAt = parseInt(vm.searchParams.payEndAt) || undefined;
            vm.tempParams = angular.copy(vm.searchParams);

            //对时间范围的处理
            if (vm.tempParams.payStartAt - 1 >= vm.tempParams.payEndAt) {
                var tempAt = vm.tempParams.payStartAt;
                //搜索按钮指令会对vm.searchParams.end + 86400000 -1,所以要反向操作
                vm.tempParams.payStartAt = vm.tempParams.payEndAt - 86400000 + 1;
                vm.tempParams.payEndAt = tempAt + 86400000 - 1;
            }

            //交易金额的处理
            if(vm.tempParams.amountStart < vm.tempParams.amountEnd) {
                var amountTemp = vm.tempParams.amountStart;
                vm.tempParams.amountStart = vm.tempParams.amountEnd;
                vm.tempParams.amountEnd = vm.tempParams.amountStart;
            }

        }());

        //获取交易记录
        portService.transactionDetails(vm.tempParams).then(function(res) {
            if(res.data.code === 0) {
                vm.transactionDetails = res.data.data;
                vm.total = vm.transactionDetails.total;
                console.log(vm.transactionDetails)
            } else {
                $rootScope.alert(res.data.message);
            }
        })

        //通过医师详情接口获取姓名
        portService.getDoctorDetails(vm.searchParams.did).then(function (res){
            if(res.data.code === 0) {
                vm.detailData = res.data.data;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }
]);

