/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('OpinionListCtrl', OpinionListCtrl);

    OpinionListCtrl.$inject = ['portService'];

    /* @ngInject */
    function OpinionListCtrl(portService){
        var vm = this;
        vm.title = 'OpinionListCtrl';

        activate();

        ////////////////

        function activate(){
            portService
        }
    }

})();

