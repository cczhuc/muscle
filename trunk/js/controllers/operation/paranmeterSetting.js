/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ParameterSettingCtrl', ParameterSettingCtrl);

    ParameterSettingCtrl.$inject = ['$rootScope','$filter','portService'];

    /* @ngInject */
    function ParameterSettingCtrl($rootScope,$filter,portService){
        var vm = this;
        vm.title = 'ParameterSettingCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.params = 2;
        vm.currentValue = $filter('number')(vm.params,2);
        vm.restore = function(){
            vm.currentValue = $filter('number')(vm.params,2);
        };
        vm.save = function(){
            $rootScope.operationConfirm('', '确认保存修改？', function(){
                portService.putParam(vm.currentValue).then(function(res){
                    if(res.code === 0){
                        $rootScope.alert(res.message);
                        $rootScope.alert('保存成功');
                    }else {
                        $rootScope.alert(res.message);
                    }
                })
            })
        }
    }

})();