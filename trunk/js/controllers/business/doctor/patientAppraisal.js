angular.module('admin').controller('PatientAppraisalCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.patientAppraisalList(vm.searchParams).then(function (res){
            if (res.data.code===0) {

                vm.appraisalList = res.data.data;
                vm.total = res.data.data.total;
                console.log( vm.appraisalList);
                console.log(vm.total);
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }
]);