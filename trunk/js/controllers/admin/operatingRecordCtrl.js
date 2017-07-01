angular.module('admin').controller('operatingRecordCtrl',['$rootScope','$state','recordService','$cookies', operatingRecordCtrl]);

function operatingRecordCtrl($rootScope, $state,recordService,$cookies) {
    var vm = this;
    vm.params = {
        operateStart: $state.params.operateStart,
        operateEnd: $state.params.operateEnd,
        managerName: $state.params.managerName,
        operate:$state.params.operate,
        roleID:$state.params.roleID
    };

    //var moduleId = JSON.parse($cookies.records).moduleID;
    //var modulePermission = $rootScope.permissionSet[moduleId];
    //
    //vm.created = modulePermission.in_array("create");
    //vm.updated = modulePermission.in_array("update");
    //vm.deleted = modulePermission.in_array("delete");
    //vm.sorted = modulePermission.in_array("sort");

    recordService.getList(vm.params).then(function(res) {
        if (res.data.code === 0) {
            vm.list = res.data.data.list;
        } else {
            $rootScope.alert(res.data.message);
        }
    });


    vm.search = function() {
        console.log(vm.params);
        $state.go("field.operatingRecord", vm.params,{reload:true});
    };

    // 删除
    vm.del = function (id, index) {
        $rootScope.confirm("您确定要删除这条记录？", function () {
            recordService.del(id).then(function (res) {
                if (res.data.code === 0) {
                    vm.list.splice(index, 1);
                }
                else{$rootScope.alert(res.data.message);
                }
            });
        })
    };

}

