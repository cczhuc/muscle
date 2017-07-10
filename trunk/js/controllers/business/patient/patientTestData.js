angular.module('admin').controller('PatientTestDataCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;
        // 时间格式转换
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        portService.getPatientTestData(vm.searchParams.id).then(function (res) {
            if(res.data.code==0) {
                console.log(res);
                vm.patientTestData = res.data.data.testDataList;
                vm.total = res.data.data.total;
            }
            else {
                $rootScope.alert(res.data.message)
            }

        })
    }
]);
