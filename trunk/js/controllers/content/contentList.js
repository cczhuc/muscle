/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentListCtrl', ContentListCtrl);

    ContentListCtrl.$inject = ['$scope'];

    /* @ngInject */
    function ContentListCtrl($scope){
        var vm = this;
        vm.title = 'ContentListCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
    }

})();

