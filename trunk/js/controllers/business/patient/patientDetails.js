angular.module('admin').controller('PatientDetailsCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.Params = $state.params;
        vm.phoneModifyFlag = true; //手机号码ng-disable的flag标志位
        portService.getPatientDetails(vm.Params.id).then(function (res){
            if(res.data.code === 0) {
                vm.user = res.data.data;
                vm.MobileCopy =  vm.user.mobile; //复制一份手机号码，用于修改手机号时，点击取消按钮的还原
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
            if (vm.user.mobile.length != 11) {
                $rootScope.alert("手机号长度错误");
                return;
            }
            else {
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
            }
        };
    }
]);
