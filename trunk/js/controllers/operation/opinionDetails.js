/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('OpinionDetailsCtrl', OpinionDetailsCtrl);

    OpinionDetailsCtrl.$inject = ['$scope'];

    /* @ngInject */
    function OpinionDetailsCtrl($scope){
        var vm = this;
        vm.title = 'OpinionDetailsCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

