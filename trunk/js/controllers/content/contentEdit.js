/**
 * Created by Free Wang on 2017/7/5.
 */
(function(){
    'use strict';

    angular
        .module('admin')
        .controller('ContentEditCtrl', ContentEditCtrl);

    ContentEditCtrl.$inject = ['$scope','FileUploader','uploadService'];

    /* @ngInject */
    function ContentEditCtrl($scope,FileUploader,uploadService){
        var vm = this;
        vm.title = 'ContentEditCtrl';

        activate();

        ////////////////

        function activate(){
            // code
        }
        $scope.$on('emitCreateDaily', function (evt, value) {
            $scope.emitCreateDaily = value;
        });
        vm.send = function(){
            alert($scope.emitCreateDaily.getPlainTxt());
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

