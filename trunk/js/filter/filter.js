'use strict';
angular.module('admin')
    // 认证管理-认证列表-认证状态
    .filter('approvedListStatusFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "已认证";
                case 1:
                    return "未认证";
                case 2:
                    return "已拒绝";
                case 3:
                    return "已撤销";
            }
        }
    })
    // 拒绝取消理由
    .filter('approvedListReasonFilter', function () {
        return function (reason) {
            if (reason==="") {
                return "—";
            }
            else {
                return reason
            }
        }
    });



