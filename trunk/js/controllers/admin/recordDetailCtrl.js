angular.module('admin').controller('recordDetailCtrl',['$rootScope','$window','$state','recordService', recordDetailCtrl]);

function recordDetailCtrl($rootScope,$window,$state,recordService) {
    var vm = this;

    var id=$state.params.id;


    if(id){
        recordService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }


    vm.cancel = function() {
        $window.history.back();
    };


    vm.del = function (id) {
        $rootScope.confirm("您确定要删除这条记录？", function () {
            recordService.del(id).then(function (res) {
                if (res.data.code === 0) {
                    $rootScope.alert("已成功删除", $state.go("field.operatingRecord"));
                }
                else {$rootScope.alert(res.data.message);
                     }
            });
        })
    };




}
