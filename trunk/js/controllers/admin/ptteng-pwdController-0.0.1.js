'use strict';
angular.module('admin')
    .controller('PwdCtrl', ['$scope', 'commonUtil','pwdService',PwdCtrl]);
        function PwdCtrl($scope, commonUtil,pwdService) {
        var vm = $scope.vm = {};

        vm.save = function() {

            if(vm.data.newPwd==vm.data.newPwdAgain){
                pwdService.changePwd(vm.data).then(function(res){

                    commonUtil.showReturnMsg(res,"field.dashboard");

                })
            }else{
                var res={};
                res.data={};
                res.data.message="密码不一致";

                commonUtil.showErrMsg(res);

            }



        };



    }