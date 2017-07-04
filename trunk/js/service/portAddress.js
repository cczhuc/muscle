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
        }
    }
});
