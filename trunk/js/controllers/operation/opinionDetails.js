/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('OpinionDetailsCtrl', OpinionDetailsCtrl);

    OpinionDetailsCtrl.$inject = ['portService','$rootScope','$state'];

    /* @ngInject */
    function OpinionDetailsCtrl(portService,$rootScope,$state){
        var vm = this;
        vm.id = $state.params.id;

        activate();

        ////////////////

        function activate(){
            portService.getOpinionDetails(vm.id).then(function(res){
                if(res.data.code ===0){
                    vm.data = res.data.data;
                }else{
                    $rootScope.alert(res.data.message)
                }
            })
        }
        // 删除
        vm.delete = function($index){
            $rootScope.operationConfirm('删除将在列表删除此条记录', '确认删除？', function(){
                portService.OpinionDelete(vm.id).then(function(res){
                    if(res.data.code == 0){
                        $state.go("field.opinionList", vm.searchParams, {reload : true})
                    } else {
                        $rootScope.alert(res.data.message)
                    }
                })
            })
        };
    }

})();

