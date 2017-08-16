/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ParameterSettingEditCtrl', ParameterSettingEditCtrl);

    ParameterSettingEditCtrl.$inject = ['$rootScope', 'portService', '$state'];

    /* @ngInject */
    function ParameterSettingEditCtrl($rootScope, portService, $state){
        var vm = this;
        vm.title = 'ParameterSettingEditCtrl';
        vm.id = $state.params.id;
        function activate(){
            portService.getParamDetail(vm.id).then(function(res){
                if(res.data.code == 0){
                    vm.data = res.data.data;
                    vm.total = res.data.total;
                } else {
                    $rootScope.alert(res.data.message)
                }
            })
        }

        if(vm.id !== ''){
            activate();
        }
        vm.save = function(){
            if(vm.id !== ''){
                editData()
            }else{
                newData()
            }
        };
        function editData(){
            portService.putParamDetail(vm.id, vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert(res.data.message);
                    $state.go('field.parameterSetting');
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
        function newData(){
            portService.postParamDetail(vm.data).then(function(res){
                if(res.data.code === 0){
                    $rootScope.alert(res.data.message);
                    $state.go('field.parameterSetting');
                } else {
                    $rootScope.alert(res.data.message);
                }
            })
        }
    }

})();