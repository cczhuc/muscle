
angular.module('admin').controller('PlanTemplateCtrl',['$rootScope','$state','$http','portService',
    function($rootScope,$state,$http,portService) {
        var vm = this;
        vm.searchParams = $state.params;

        portService.planTemplate().then(function(res) {
            if(res.data.code === 0) {

                vm.planTemplate = res.data.data;
                console.log(vm.planTemplate.planList);
            } else {
                $rootScope.alert(res.data.message)
            }

        });

    }
]);