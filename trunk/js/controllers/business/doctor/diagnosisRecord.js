angular.module('admin').controller('DiagnosisRecordCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.diagnosisRecord(vm.searchParams).then(function (res){
            if (res.data.code===0) {

                vm.diagnosisRecord = res.data.data;
                vm.total = res.data.data.total;
                // console.log( vm.diagnosisRecord);
                // console.log(vm.total);
            } else {
                $rootScope.alert(res.data.message);
            }
        });

    }
]);
