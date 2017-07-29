angular.module("admin").controller('HospitalEditCtrl',["$rootScope","$state","$http","portService",
"hospitalGrade","commonUtil","FileUploader","uploadService",
    function ($rootScope,$state,$http,portService,hospitalGrade,commonUtil,FileUploader,uploadService) {
        var vm = this;
        vm.data = $state.params;
        vm.hospitalGrade = hospitalGrade;
        //上传图片
        // 能否重复上传同一张图片，默认为false，可以如此覆盖 true|false
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return true;
        };
        //图片上传
        vm.uploader1 = uploadService.uploadFile(FileUploader);
        vm.uploader1.onSuccessItem = function (fileItem, response, status, headers) {
            if (status === 200) {
                vm.data.img = response.data.url;
            }
        };


        //省市拆分
        if (vm.data.address) {
            vm.data.province = vm.data.address.province;
            vm.data.city = vm.data.address.city;
            // vm.data.county = vm.data.address.district;
        }
        // 省市区数据转换
        vm.data.address = commonUtil.areaDateTransform(vm.data.province, vm.data.city, vm.data.county);
        // 编辑
        if (vm.data.id) {
            //获取数据
            portService.getHospitalDetails(vm.data.id).then(function (res) {
                if (res.data.code==0) {
                    console.log(res);
                    vm.data = res.data.data;
                }
                else {
                    $rootScope.alert(res.data.message)
                }

            });
            // 立即上线
            vm.pubHospital = function () {
                $rootScope.operationConfirm("上线将在前台展示此内容", "确认上线？",function () {
                    vm.data.status=0;
                    portService.editHospital(vm.data.id,vm.data).then(function (res) {
                        if (res.data.code===0) {
                            console.log(res);
                            $state.go("field.hospitalList", {reload: true});
                            $rootScope.alert("上线成功")
                        }
                        else {
                            $rootScope.alert(res.data.message)
                        }
                    });
                });
            };
            // 存为草稿
            vm.saveHospital = function () {
                vm.data.status=1;
                portService.editHospital(vm.data.id,vm.data).then(function (res) {
                    if (res.data.code===0) {
                        console.log(res);
                        $state.go("field.hospitalList", {reload: true});
                        $rootScope.alert("编辑成功")
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        }
        // 新增
        else {
            // 立即上线
            vm.pubHospital = function () {
                $rootScope.operationConfirm("上线将在前台展示此内容", "确认上线？",function () {
                    vm.data.status=0;
                    portService.addHospital(vm.data).then(function (res) {
                        console.log(res);
                        if (res.data.code===0) {
                            $state.go("field.hospitalList", {reload: true});
                            $rootScope.alert("上线成功")
                        }
                        else {
                            $rootScope.alert(res.data.message)
                        }
                    });
                });
            };
            // 存为草稿
            vm.saveHospital = function () {
                vm.data.status=1;
                portService.addHospital(vm.data).then(function (res) {
                    if (res.data.code===0) {
                        console.log(res);
                        $state.go("field.hospitalList", {reload: true});
                        $rootScope.alert("编辑成功")
                    }
                    else {
                        $rootScope.alert(res.data.message)
                    }
                })
            }
        }
    }
]);
