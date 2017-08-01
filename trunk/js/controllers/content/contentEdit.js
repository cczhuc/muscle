/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentEditCtrl', ContentEditCtrl);

    ContentEditCtrl.$inject = ['$scope','FileUploader','uploadService','portService','$state','$rootScope','$timeout'];

    /* @ngInject */
    function ContentEditCtrl($scope,FileUploader,uploadService,portService,$state,$rootScope,$timeout){
        var vm = this;
        vm.id = $state.params.id;
        // 判断编辑还是新增
        if(vm.id){
            activate(vm.id);
        }
        function activate(id){
            portService.getContentSlice(id).then(function(res){
                vm.data = res.data.data.article;
            })
        }

        // 获取富文本内容
        $scope.$on('emitCreateDaily', function (evt, value) {
            $scope.emitCreateDaily = value;
        });
        vm.send = function(status){
            // 获取带格式文本
            // vm.data.content = $scope.emitCreateDaily.getPlainTxt();
            vm.data.content = $scope.emitCreateDaily.getContent();
            vm.data.status = status;
            // vm.data.type = 1;
            vm.data.img = "asdfa.jpg";
            if(vm.id){
                portService.putContent(vm.id,vm.data).then(function(res){
                    if(res.data.code === 0){
                        $rootScope.alert("发送成功");
                        $state.go('field.contentListDoctor', {}, {reload : true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            }else{
                portService.postContent(vm.data).then(function(res){
                    if(res.data.code === 0){
                        $rootScope.alert("发送成功");
                        $state.go('field.contentListDoctor', {}, {reload : true});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            }
        };
        //图片上传1
        vm.uploader1 = uploadService.uploadFile(FileUploader);
        vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.data.img = response.data.url;
            }
        };
    }
})();

