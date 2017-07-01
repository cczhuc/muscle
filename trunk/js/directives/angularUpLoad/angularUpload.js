/**
 * Created by Administrator on 2017/3/9.
 */
/*选择图片上传的指令,有一个参数，传入一个选项框的名字,用=绑定成功就会有数据返回的接口*/
'use strict';
angular.module('admin')
    .directive('angularUpload', function (FileUploader) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'js/directives/angularUpLoad/angularUpload.html',
            scope: {
                //框名
                labelName: '@',
                //绑定到controller中的最后地址
                fileItem: '=',
                //当前上传框ID
                labelId: '@',
                //过滤器名称
                fileterName: '@'
            },
            controller: function ($scope) {
                //URL可能需要动态修改一下
                var uploader = $scope.uploader = new FileUploader({
                    url: '/a/u/img/zmy'
                });
                $scope.fileItem = "";
                uploader.onSuccessItem = function (fileItem, response) {
                    $scope.fileItem = response.data.url;
                };
                $scope.clearFile = function () {
                    $scope.fileItem = "";
                };
                //操作错误提示
                $scope.docCheack = true;
                $scope.imgCheack = true;
                $scope.filsize5 = true;
                $scope.filsize3 = true;
                /*添加过滤规则，图片*/
                uploader.filters.push({
                    name: 'docFilter',
                    fn: function (item/*这是传入的需要过滤的东西*/) {
                        var type = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
                        /*确认传入文件的后缀*/
                        $scope.docCheack ='|docx|pdf|doc|'.indexOf(type) !== -1;
                        return $scope.docCheack;    //确认后缀是不是文件
                    }
                });
                //文件
                uploader.filters.push({
                    name: 'imageFilter',
                    fn: function (item/*这是传入的需要过滤的东西*/) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        /*确认传入文件的后缀*/
                        $scope.imgCheack =  'jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                        return $scope.imgCheack;    //确认后缀是不是图片
                    }
                });
                //大小限制5M
                uploader.filters.push({
                    name:'docSize',
                    fn:function (item) {
                        $scope.filsize5 = item.size <= 5242880 ;
                        return $scope.filsize5 ; // 1024 * 1024 | Math.pow(2,20); | 0x100000
                    }
                });
                //大小限制3M
                uploader.filters.push({
                    name:'imgSize',
                    fn:function (item) {
                        $scope.filsize3 = item.size <= 3145728;
                        return $scope.filsize3; // 1024 * 1024 | Math.pow(2,20); | 0x100000
                    }
                });
            }
        }
    });