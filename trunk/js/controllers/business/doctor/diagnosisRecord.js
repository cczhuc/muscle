angular.module('admin').controller('DiagnosisRecordCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        //把需要日历插件需要+86399999的参数的名字以字符串放进来，写在html中search指令的属性里，给search指令去处理
        vm.timeFixArr = ["createTo"];
        vm.searchParams = $state.params;
        vm.searchParams.createFrom = parseInt(vm.searchParams.createFrom) || undefined;
        vm.searchParams.createTo = parseInt(vm.searchParams.createTo) || undefined;

        /***需求：对输入范围的左边和右边的大小不限。但是在发送数据的时候要对这些倒过来的参数进行处理
         vm.tempParams是vm.searchParams的深拷贝，处理好时间和年龄的顺序后发送给后端***/
        (function () {
            vm.tempParams = angular.copy(vm.searchParams);
            if(vm.tempParams.createFrom - 1 >= vm.tempParams.createTo) {
                var tempAt = vm.tempParams.createFrom;
                //搜索按钮指令会对vm.searchParams.end + 86400000 -1,所以要反向操作
                vm.tempParams.createFrom = vm.tempParams.createTo - 86400000 + 1;
                vm.tempParams.createTo = tempAt + 86400000 -1;
            }
        }());

        //获取诊断记录
        portService.diagnosisRecord(vm.tempParams).then(function (res){
            if (res.data.code===0) {

                vm.programRelationList = res.data.data.program;
                vm.patient = res.data.data.patientList;
                console.log(" vm.patient", res.data);
                vm.total = res.data.data.total;
            } else {
                $rootScope.alert(res.data.message);
            }
        });

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
