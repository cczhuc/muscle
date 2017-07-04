/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ParameterSettingCtrl', ParameterSettingCtrl);

    ParameterSettingCtrl.$inject = ['$rootScope'];

    /* @ngInject */
    function ParameterSettingCtrl($rootScope){
        var vm = this;
        vm.title = 'ParameterSettingCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.f_save = function(){

        }
    }

})();