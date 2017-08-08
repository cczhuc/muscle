angular.module('admin').controller('AppraisalDetailsCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        vm.Params = $state.params;

        portService.appraisalDetails(vm.Params.id).then(function (res){
            if(res.data.code === 0) {
                // console.log("res",res);
                vm.comment = res.data.data;
                vm.user = res.data.user[vm.comment.pid];
                console.log(vm.comment);
                console.log(vm.user);
            } else {
                $rootScope.alert(res.data.code);
            }
        });

        vm.deleteComment = function() {
            $rootScope.operationConfirm("删除将同时在前台删除此条评论","确认删除？",function () {
                portService.deleteComment(vm.Params.id).then(function(res) {
                    if(res.data.code === 0){
                        $state.go("field.patientAppraisal", {}, {reload: true});
                        $rootScope.alert("删除成功", function () {});
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                })
            });
        };

    }
]);

