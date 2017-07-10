angular.module('admin').controller('DiagnosisDetailsCtrl', ['$rootScope', '$state', '$http', 'portService',
    function ($rootScope, $state, $http, portService) {
        var vm = this;
        vm.Params = $state.params;

        portService.diagnosisDetails().then(function (res) {

            if (res.data.code === 0) {
                vm.diagnosisDetails = res.data.data;
                console.log(vm.diagnosisDetails);
            } else {
                $rootScope.alert(res.data.message);
            }
        });

    }
]);
