/**
 * Created by Free Wang on 2017/7/4.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('MessageListCtrl', MessageListCtrl);

    MessageListCtrl.$inject = ['$rootScope','portService'];

    /* @ngInject */
    function MessageListCtrl($rootScope,portService){
        var vm = this;
        vm.title = 'MessageListCtrl';

        activate();

        ////////////////

        function activate(){
            portService.getMessageList().then(function(res){
                vm.message = res.data.data.messageList;
                vm.total = res.data.data.total;
                console.log(vm.message)
            })
        }
    }

})();

