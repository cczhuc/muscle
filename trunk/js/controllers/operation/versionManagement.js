/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('VersionManagementCtrl', VersionManagementCtrl);

    VersionManagementCtrl.$inject = ['portService'];

    /* @ngInject */
    function VersionManagementCtrl(portService){
        var vm = this;
        vm.title = 'VersionManagementCtrl';

        activate();

        ////////////////

        function activate(){
            portService.getVersionList().then(function(res){
                vm.version = res.data.data.versionList;

                console.log(vm.version)
            })
        }
    }

})();

