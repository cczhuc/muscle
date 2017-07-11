angular.module('admin').controller('DoctorDetailsCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.Params = $state.params;
        vm.phoneModifyFlag = true; //手机号码ng-disable的flag标志位
        portService.getDoctorDetails().then(function (res){
            if(res.data.code === 0) {
                vm.doctorDetail = res.data.data;
                vm.user = vm.doctorDetail.user;
                vm.MobileCopy =  vm.user.mobile; //复制一份手机号码，用于修改手机号时，点击取消按钮的还原
                console.info(res.data.data)
            } else {
                $rootScope.alert(res.data.message);
            }
        });

        /*****点击按钮修改手机号码的3个函数*****/
        vm.modifyPhone = function() {
            $rootScope.operationConfirm("保存修改个人信息", "确认修改？",function () {
                vm.phoneModifyFlag = false;
            });
        };

        vm.cancelModifyPhone = function() {
            vm.phoneModifyFlag = true;
            vm.user.mobile = vm.MobileCopy;
        };

        vm.savelModifyPhone = function() {

            $rootScope.operationConfirm("保存修改个人信息", "确认保存？",function () {
                vm.phoneModifyFlag = true;
                portService.changeUserMobile(vm.user.id,vm.user.mobile).then(function(res) {
                    if(res.data.code === 0){
                        $state.go($state.current, {}, {reload: true});
                        $rootScope.alert("保存成功", function () {})
                    }
                    else {
                        $rootScope.alert(res.data.message);
                    }
                })

            });
        };

        vm.notBundle = function () {

                $rootScope.operationConfirm("解绑将删除该银行卡信息", "确认修改？",function () {
                    //发送请求
                    $rootScope.alert("解绑成功", function () {})
                });

        };

    }
]);