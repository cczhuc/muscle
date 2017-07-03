angular.module("admin").factory("address",function ($state,$http){
    return {
        // 获取认证列表
        approvedList_url: function () {
            return "JSON/approvedList.json"
        }

    }
});
