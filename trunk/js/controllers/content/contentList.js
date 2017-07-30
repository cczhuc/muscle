/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentListCtrl', ContentListCtrl);

    ContentListCtrl.$inject = ['$scope', 'portService', '$rootScope', '$timeout','$state'];

    /* @ngInject */
    function ContentListCtrl($scope, portService, $rootScope, $timeout,$state){
        var vm = this;
        vm.title = 'ContentListCtrl';

        vm.search(vm.data);

        ////////////////
        vm.data = $state.params;
        vm.search = function (data){
            portService.getContentList(data).then(function(res){
                vm.total = res.data.data.total;
                vm.content = res.data.data.articleList;
                console.log(vm.content)
            })
        };

        // 拖动部分
        vm.sort = function(){
            $scope.sortableOptions.disabled = false;
        };
        vm.save = function(){
            if(vm.resArr == undefined){
                $rootScope.alert('请先进行排序')
            } else {
                $scope.sortableOptions.disabled = true;
                portService.putSort(vm.resArr).then(function(res){
                    if(res.data.code === 0){
                        $rootScope.alert(res.data.message)
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        };
        // 成功拖动
        $scope.cannotSort = false;
        $scope.sortableOptions = {
            // 数据有变化
            update : function(e, ui){
                //需要使用延时方法，否则会输出原始数据的顺序，可能是BUG？
                $timeout(function(){
                    vm.resArr = [];
                    for(var y = 0; y < vm.content.length; y++){
                        vm.resArr.push(vm.content[y].id);
                    }
                    console.log(vm.resArr);
                })
            },
            disabled : true
        };
        // 操作部分
        vm.offline = function($index){
            $rootScope.operationConfirm('下线将使前台不再展示此内容', '确认下线？', function(){
                portService.putContentStatus(vm.content[$index].id,{status:2}).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current, vm.params, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            })
        };
        vm.online = function($index){
            $rootScope.operationConfirm('上线将在前台展示此内容', '确认上线？', function(){
                portService.putContentStatus(vm.content[$index].id,{status:1}).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,vm.params,{reload:true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                });
            })
        };
        vm.delete = function(){
            $rootScope.operationConfirm('删除将自动下线此内容', '确认删除？', function(){
                $rootScope.alert('删除成功');
            })
        };
    }

})();

