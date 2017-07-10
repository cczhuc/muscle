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
        vm.online = function(){
            $rootScope.operationConfirm('下线将使前台不再展示此内容', '确认下线？', function(){
                $rootScope.alert('下线成功');
            })
        };
        vm.offline = function(){
            $rootScope.operationConfirm('上线将使前台不再展示此内容', '确认上线？', function(){
                $rootScope.alert('上线成功');
            })
        }
    }

})();

