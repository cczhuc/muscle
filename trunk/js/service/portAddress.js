angular.module("admin").factory("address",function ($state,$http){
    return {
        // 获取认证列表
        approvedList_url: function () {
            return "JSON/approvedList.json"
        },
        // 获取认证详情
        approvedDetails_url: function (id) {
            return "JSON/approvedDetails.json"
            // +id
        },

        userList_url: function() {
            return "JSON/userList.json"
        },

        // 内容管理
        contentList_url:function(){
            return "/a/u/content/search"
        },

        // 运营管理
        messageList_url:function(){
            return "/a/u/message/search"
        },
        // 意见反馈
        opinionList_url:function(){
            return "/a/u/opinion/search"
        },
        // 版本列表
        versionList_url:function(){
            return "/a/u/version/search"
        }
    }
});
