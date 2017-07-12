/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentListCtrl', ContentListCtrl);

    ContentListCtrl.$inject = ['$scope','portService','$rootScope','$timeout'];

    /* @ngInject */
    function ContentListCtrl($scope,portService,$rootScope,$timeout){
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
        // 拖动部分
        vm.sort = function(){
            $scope.sortableOptions.disabled = false;
            console.log($scope.sortableOptions);
        };
        vm.save = function(){
            $scope.sortableOptions.disabled = true;
            vm.ranks = vm.resArr.join('&rank=');
            portService.putContentRank(vm.ranks).then(function(res){
                console.log(res);
            })
        };
        // 成功拖动
        $scope.cannotSort = false;
        $scope.sortableOptions = {
            // 数据有变化
            update: function(e, ui) {
                //需要使用延时方法，否则会输出原始数据的顺序，可能是BUG？
                $timeout(function() {
                    vm.resArr = [];
                    for (var y = 0; y < vm.content.length; y++) {
                        vm.resArr.push(vm.content[y].id);
                    }
                    console.log(vm.resArr);
                })
            },
            disabled:true
        };
        // 操作部分
        vm.offline = function(){
            $rootScope.operationConfirm('下线将使前台不再展示此内容', '确认下线？', function(){
                $rootScope.alert('下线成功');
            })
        };
        vm.online = function(){
            $rootScope.operationConfirm('上线将在前台展示此内容', '确认上线？', function(){
                $rootScope.alert('上线成功');
            })
        };
        vm.delete = function(){
            $rootScope.operationConfirm('删除将自动下线此内容', '确认删除？', function(){
                $rootScope.alert('删除成功');
            })
        };
    }

})();

