angular.module('admin').controller('TransactionDetailsCtrl',['$rootScope','$state','$http','portService',
    function($rootScope, $state, $http, portService) {
        var vm = this;
        vm.Params = $state.params;
        portService.transactionDetails(vm.Params).then(function(res) {
            if(res.data.code === 0) {
                vm.transactionDetails = res.data.data;
                vm.total = vm.transactionDetails.total;
                console.log(vm.transactionDetails)
            } else {
                $rootScope.alert(res.data.message);
            }
        })
    }
]);

