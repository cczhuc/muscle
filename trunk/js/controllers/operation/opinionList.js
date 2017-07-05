/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('OpinionListCtrl', OpinionListCtrl);

    OpinionListCtrl.$inject = ['$scope'];

    /* @ngInject */
    function OpinionListCtrl($scope){
        var vm = this;
        vm.title = 'OpinionListCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

