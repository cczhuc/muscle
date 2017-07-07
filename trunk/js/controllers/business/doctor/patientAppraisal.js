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



        // vm.goUserDetail = function(userId,app) {
        //     if(app === 0)
        //         $state.go("field.patientDetails",{userId:userId},{reload:true});
        //     else if(app===1)
        //         $state.go("field.doctorDetails",{userId:userId},{reload:true});
        // }


    }
]);