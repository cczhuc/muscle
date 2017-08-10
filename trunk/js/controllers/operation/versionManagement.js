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
                vm.data = res.data.data;
                for(var y=0;y<vm.data.length;y++){
                    vm.data[y].info = JSON.parse(vm.data[y].info)
                }
                vm.doctor = [];
                vm.patient = [];
                for(var i=0;i<vm.data.length;i++){
                    if(vm.data[i].app == '医师版'){
                        vm.doctor.push(vm.data[i])
                    }else {vm.patient.push(vm.data[i])}
                }
            })
        }
    }

})();

