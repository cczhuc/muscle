/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('VersionManagementCtrl', VersionManagementCtrl);

    VersionManagementCtrl.$inject = ['$scope'];

    /* @ngInject */
    function VersionManagementCtrl($scope){
        var vm = this;
        vm.title = 'VersionManagementCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

