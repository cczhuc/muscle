/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ParameterSettingCtrl', ParameterSettingCtrl);

    ParameterSettingCtrl.$inject = ['$rootScope','portService','$state'];

    /* @ngInject */
    function ParameterSettingCtrl($rootScope,portService,$state){
        var vm = this;
        vm.title = 'ParameterSettingCtrl';

        vm.searchParams = $state.params;

        vm.timeFixArr = ['endAt'];
        vm.searchParams.startAt = parseInt(vm.searchParams.startAt) || undefined;
        vm.searchParams.endAt = parseInt(vm.searchParams.endAt) || undefined;
        function activate(){
            portService.getParamList(vm.searchParams).then(function(res){
                if(res.data.code === 0){
                    vm.total = res.data.total;
                    vm.data = res.data.data;
                }else{
                    $rootScope.alert(res.data.message);
                }
            });
        }
        activate();
    }

})();