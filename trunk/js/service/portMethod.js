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
        getContentList:function(param){
            return $http.get(address.contentList_url())
        },

        // 运营管理
        getMessageList:function(param){
            return $http.get(address.messageList_url())
        }
    }
});