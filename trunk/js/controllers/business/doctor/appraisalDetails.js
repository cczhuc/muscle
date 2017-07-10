angular.module('admin').controller('AppraisalDetailsCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.Params = $state.params;

        portService.appraisalDetails().then(function (res){

        });


        vm.delete = function() {
            $rootScope.operationConfirm("删除将在本地删除此条记录", "确认删除？",function () {

                // portService.operationConfirm(vm.Params.appraisalId).then(function(res) {
                    // if(res.data.code === 0){
                    //     $state.go($state.current, {}, {reload: true});

                $state.go("field.patientAppraisal", {}, {reload: true});
                        $rootScope.alert("删除成功", function () {})
                    // }
                    // else {
                    //     $rootScope.alert(res.data.message);
                    // }
                // })

            });
        }


    }
]);

