/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageListCtrl', MessageListCtrl);

    MessageListCtrl.$inject = ['$scope'];

    /* @ngInject */
    function MessageListCtrl($scope){
        var vm = this;
        vm.title = 'MessageListCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

