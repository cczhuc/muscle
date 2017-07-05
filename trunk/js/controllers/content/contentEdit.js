/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentEditCtrl', ContentEditCtrl);

    ContentEditCtrl.$inject = ['$scope'];

    /* @ngInject */
    function ContentEditCtrl($scope){
        var vm = this;
        vm.title = 'ContentEditCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

