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
            portService.getOpinionList().then(function(res){
                console.log(res.data.data.opinionList);
                console.log(res);
                vm.opinion = res.data.data.opinionList;
                vm.total = res.data.data.total;
            })
        }
    }

})();

