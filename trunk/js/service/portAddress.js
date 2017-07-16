angular.module("admin").factory("address",function ($state,$http){
    return {
        //用户列表
        userList_url: function() {
            return "JSON/userList.json"
        },
        // 获取认证列表
        approvedList_url: function () {
            return "JSON/approvedList.json"
        },
        // 取消认证
        cancelApproved_url: function () {
            return "JSON/changeUserStatus.json"
        },
        //改变用户冻结状态
        changeUserStatus_url: function(id,type,status) {
            return "JSON/changeUserStatus.json"
        },

        //改变手机号码
        changeUserMobile_url: function(id,mobile) {
            return "JSON/changeUserStatus.json"
        },
        // 获取认证详情
        approvedDetails_url: function (id) {
            return "JSON/approvedDetails.json"
            // +id
        },

        // 合作医院管理
        // 获取合作医疗医院列表
        hospitalList_url:function () {
            return "/a/hospital/search"
        },
        // 改变医院上下线
        changeHospitalStatus_url: function(id,type,status) {
            return "JSON/changeUserStatus.json"
        },
        // 获取医院详情
        hospitalDetails_url: function(id) {
            return "/a/hospital"
            // +id
        },
        //上传图片接口
        upload_url: function () {
            return "/a/u/img/"
        },
        // 立即上线、存为草稿
        editHospital_url: function(id) {
            return ""+id
        },
        addHospital_url: function () {
            return ""
        },
        // 合作医院的医师管理
        hospitalDoctor_url: function (id) {
            return "/a/u/hospital/doctor"
            // +id
        },
        // 患者版订单记录
        patientRecord_url: function (id) {
            return "/a/u/patientRecord"
            // +id
        },
        // 患者版监测数据
        patientTestData_url: function (id) {
            return "/a/u/patientTestData"
            // +id
        },
        // 审核
        approvedcheck_url: function (id) {
            return "JSON/changeUserStatus.json"
        },
        //医师详情
        doctorDetails_url: function(id) {
            return "/a/user"
        },

        //方案列表
        planTemplate_url: function(id) {
            return "/a/planTemplate"
        },

        //医师的评价列表
        patientAppraisalList_url: function (id) {
            return "/a/PatientAppraisalLit"
        },

        //医师评价详情
        appraisalDetails_url: function (id) {
            return "/a/appraisalDetails"
        },

        //医师的诊断记录
        diagnosisRecord_url: function (id) {
            return "/a/diagnosisRecord"
        },

        //诊断详情
        diagnosisDetails_url: function (recordId) {
            return "/a/diagnosisDetails"
        },

        //医师交易明细
        transactionDetails_url: function (id) {
            return "/a/transactionDetails"
        },

        // 内容管理
        contentList_url:function(){
            return "/a/u/content/search"
        },
        contentRank_url:function(rank){
            return "/a/u/content/rank"+rank
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
