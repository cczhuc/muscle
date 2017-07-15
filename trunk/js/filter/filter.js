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
                default :
                    return "数据异常";
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
    })

    //交易类型
    .filter('dealTypeFilter',function() {
        return function(type) {
            switch(type) {
                case 0:
                    return "提现";
                case 1:
                    return "方案出售";
                default:
                    return "type="+type+"数据异常";
            }
        }
    })
    //交易状态
    .filter('dealStatusFilter',function() {
        return function(status) {
            switch(status) {
                case 0 :
                    return "成功";
                case 1:
                    return "进行中";
                case 2:
                    return "失败";
                default:
                        return "status="+status+"数据异常";
            }
        }
    })

    //合作医院管理
    //合作医院列表状态
    .filter('hospitalListStatusFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "在用";
                case 1:
                    return "停用";
                default :
                    return "数据异常";
            }
        }
    })
    //合作医院列表等级
    .filter('hospitalGradeFilter', function (hospitalGrade) {
    return function (type) {
        for (var i = 0; i < hospitalGrade.length; i++) {
            if (type == hospitalGrade[i].type) {
                return hospitalGrade[i].name;
            }
        }
    }
    })
    // 合作医院列表上下线
    .filter('changeHospitalStatusFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "下线";
                case 1:
                    return "上线";
                default :
                    return "数据异常";
            }
        }
    })
    // 合作医院医生列表
    .filter('doctorPositionFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "主任医师";
                case 1:
                    return "副主任医师";
                case 2:
                    return "主治医师";
                case 3:
                    return "其他";
                default :
                    return "数据异常";
            }
        }
    })
    // 患者-订单记录-交易类型
    .filter('transactionTypeFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "方案支付";
                default :
                    return "数据异常";
            }
        }
    })
    // 患者-订单记录-交易状态
    .filter('transactionStatusFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "成功";
                case 1:
                    return "失败";
                default :
                    return "数据异常";
            }
        }
    })
    // 患者-订单记录-交易方式
    .filter('transactionWayFilter', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return "微信";
                case 1:
                    return "支付宝";
                default :
                    return "数据异常";
            }
        }
    })
// 内容管理
//     内容列表
    .filter('contentListStatusFilter',function(){
        return function(status){
            if(status === 0){
                return "草稿"
            }else {return "已上线"}
        }
    })

// 运营管理
//     信息状态
    .filter('messageListStatusFilter',function(){
        return function(status){
            switch(status){
                case 0:
                    return '已发送';
                case 1:
                    return '草稿';
                case 2:
                    return '即将发送'
            }
        }
    })
    // 发送人群状态
    .filter('messagepeoplesStatusFilter',function(){
        return function(status){
            switch(status){
                case 0:
                    return '所有人';
                case 1:
                    return '所有患者';
                case 2:
                    return '所有医师';
                case 3:
                    return '认证医师';
                case 4:
                    return '未认证医师';
            }
        }
    })
    //     版本过滤
    .filter('appVersionFilter',function(){
        return function(status){
            if(status === 0){
                return "医师版"
            }else {return "患者版"}
        }
    })
;



