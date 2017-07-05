/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('VersionUpdateCtrl', VersionUpdateCtrl);

    VersionUpdateCtrl.$inject = ['$scope'];

    /* @ngInject */
    function VersionUpdateCtrl($scope){
        var vm = this;
        vm.title = 'VersionUpdateCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        vm.f_info = ['你还','再见','哈哈'];
    }

})();

