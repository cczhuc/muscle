'use strict';
angular.module('admin')
    //app版本
    .filter('appFilter',function() {
        return function(app) {
            switch (app) {
                case 0:
                    return "患者版";
                case 1:
                    return "医师版";
                default:
                    return "数据异常";
            }
        }
    })

    .filter('freezedFilter',function() {
        return function(freezed) {
            switch(freezed) {
                case 0 :
                    return "正常";
                case 1:
                    return "冻结";
                default :
                    return "数据异常";
            }
        }
    })

    .filter('changeFreezedStatusFilter',function() {
        return function(freezed) {
            switch(freezed) {
                case 0 :
                    return "冻结";
                case 1:
                    return "解冻";
                default :
                    return "数据异常";
            }
        }
    })


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



