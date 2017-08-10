angular.module('admin').controller('DoctorDetailsCtrl', ['$rootScope', '$state', '$http', 'portService',
    function ($rootScope, $state, $http, portService) {
        var vm = this;
        vm.params = $state.params;
        vm.phoneModifyFlag = true; //手机号码ng-disable的flag标志位
        console.log("vm.params.id", vm.params.id);
        portService.getDoctorDetails(vm.params.id).then(function (res) {
            if (res.data.code === 0) {
                vm.data = res.data.data;
                vm.user = res.data.data.user;
                vm.hospital = res.data.data.hospital;
                vm.MobileCopy = vm.user.mobile; //复制一份手机号码，用于修改手机号时，点击取消按钮的还原
                console.info(res.data.data)
            } else {
                $rootScope.alert(res.data.message);
            }
        });

        /*****点击按钮修改手机号码的3个函数*****/
        vm.modifyPhone = function () {
            $rootScope.operationConfirm("保存修改个人信息", "确认修改？", function () {
                vm.phoneModifyFlag = false;
            });
        };

        vm.cancelModifyPhone = function () {
            vm.phoneModifyFlag = true;
            vm.user.mobile = vm.MobileCopy;
        };

        vm.saveModifyPhone = function () {

            if (vm.user.mobile.length != 11) {
                $rootScope.alert("手机号长度错误");
                return 1;
            } else {
                $rootScope.operationConfirm("保存修改个人信息", "确认保存？", function () {
                    vm.phoneModifyFlag = true;
                    portService.changeUserMobile(vm.user.id, vm.user.mobile).then(function (res) {
                        if (res.data.code === 0) {
                            $state.go($state.current, {}, {reload: true});
                            $rootScope.alert("保存成功", function () {
                            })
                        }
                        else {
                            $rootScope.alert(res.data.message);
                        }
                    })
                });
            }
        };


        //取消认证
        vm.refuse = {}; //拒绝理由，对应的传参是refuse的引用
        //取消认证
        vm.cancelApproved = function (id) {
            $rootScope.cancleApproved("取消实名将删除用户身份及银行卡信息", "确认取消？", vm.refuse, function () {
                vm.refuse.status = 4;
                // console.log(vm.refuse);
                // 发送请求取消认证变态并删除信息
                portService.cancelApproved(id, vm.refuse).then(function (res) {
                    $state.go($state.current, {}, {reload: true});
                    if (res.data.code == 0) {
                        $rootScope.alert("撤销认证成功")
                    }
                    else {
                        $rootScope.alert('取消认证失败,code=' + code)
                    }
                })
            });
        };

        <!--银行卡相关，第一期先不做-->
        //解绑银行卡
        // vm.notBundle = function () {
        //
        //         $rootScope.operationConfirm("解绑将删除该银行卡信息", "确认修改？",function () {
        //             //发送请求
        //             $rootScope.alert("解绑成功", function () {})
        //         });
        //
        // };

    }
]);