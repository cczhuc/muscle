angular.module("admin").factory("portService",function ($http,address) {
    return {
        // 获取banner图,type  0-首页 1-找职位 2-找精英
        getApprovedList: function (data) {
            return $http.get(address.approvedList_url(),{params:data})
        },

        getUserList: function (data) {
            return $http.get(address.userList_url(),{params:data})
        }
    }
});