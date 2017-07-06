/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentListCtrl', ContentListCtrl);

    ContentListCtrl.$inject = ['portService'];

    /* @ngInject */
    function ContentListCtrl(portService){
        var vm = this;
        vm.title = 'ContentListCtrl';

        activate();

        ////////////////

        function activate(){
            portService.getContentList().then(function (res){
                console.log(res);
                vm.total = res.data.data.total;
                vm.content = res.data.data.contentList;
            })
        }
    }

})();

