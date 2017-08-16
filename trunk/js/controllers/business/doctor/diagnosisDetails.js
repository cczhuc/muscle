angular.module('admin').controller('DiagnosisDetailsCtrl', ['$rootScope', '$state', '$http', 'portService',
    function ($rootScope, $state, $http, portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.diagnosisDetails(vm.searchParams.id).then(function (res) {

            if (res.data.code === 0) {
                vm.diagnosisDetails = res.data.data;
                vm.patient = res.data.patient[vm.diagnosisDetails.pid];
            } else {
                $rootScope.alert(res.data.message);
            }
        });

    }
]);
