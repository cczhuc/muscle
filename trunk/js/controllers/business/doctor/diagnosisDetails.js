angular.module('admin').controller('DiagnosisDetailsCtrl', ['$rootScope', '$state', '$http', 'portService',
    function ($rootScope, $state, $http, portService) {
        var vm = this;
        vm.Params = $state.params;

        portService.diagnosisDetails(vm.Params.id).then(function (res) {

            if (res.data.code === 0) {
                console.log("res",res);
                vm.diagnosisDetails = res.data.data.programRelation;
                vm.patient = res.data.data.patient;
                // console.log(vm.diagnosisDetails);
            } else {
                $rootScope.alert(res.data.message);
            }
        });

    }
]);
