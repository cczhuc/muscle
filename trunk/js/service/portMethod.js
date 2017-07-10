angular.module("admin").factory("portService",function ($http,address) {
    return {
        // 获取认证列表
        getApprovedList: function (data) {
            return $http.get(address.approvedList_url(),{params:data})
        },
        // 获取认证详情
        getApprovedDetails: function (id) {
            return $http.get(address.approvedDetails_url(id))
        },

        getUserList: function (data) {
            return $http.get(address.userList_url(),{params:data})
        },
        
        
        
        // 内容管理

        // 获取内容列表
        getContentList:function(param){
            return $http.get(address.contentList_url())
        },

        // 运营管理

        // 获取信息列表
        getMessageList:function(param){
            return $http.get(address.messageList_url())
        },
        // 意见反馈
        getOpinionList:function (){
            return $http.get(address.opinionList_url())
        },
        // 版本列表
        getVersionList:function (){
            return $http.get(address.versionList_url())
        }
    }
});