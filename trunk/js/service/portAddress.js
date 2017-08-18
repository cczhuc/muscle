angular.module("admin").factory("address",function ($state,$http){
    return {
        //患者列表
        patientList_url:function() {
          return "/a/u/search/patient"
        },
        //医师列表
        doctorList_url: function() {
            return "/a/u/search/doctor"
        },
        // 获取认证列表
        approvedList_url: function () {
            return "/a/u/search/certification"
        },
        // 认证/取消认证
        cancelApproved_url: function (id,data) {
            var params = $.param(data);
            return "/a/u/"+ id + "/certification?" + params
        },
        //改变用户冻结状态
        changeUserStatus_url: function(id) {
            return "/a/u/user/"+id +"/status";
        },
        //改变手机号码
        changeUserMobile_url: function(id,mobile) {
            return "/a/u/user/mobile/"+id+'?mobile='+mobile
        },
        // 获取认证详情
        approvedDetails_url: function (id) {
            return "/a/u/certification/"+id
        },

        // 合作医院管理
        // 获取合作医疗医院列表
        hospitalList_url:function () {
            return "/a/u/search/hospital"
        },
        // 改变医院上下线
        changeHospitalStatus_url: function(id,type,status) {
            return "/a/u/hospital/"+id+"/status"
        },
        // 获取医院详情
        hospitalDetails_url: function(id) {
            return "/a/u/hospital/"+id

        },
        //上传图片接口
        upload_url: function () {
            return "/a/u/img/thumb"
        },
        // 新增医院、编辑医院
        editHospital_url: function(id,data) {
            var params = $.param(data);
            return "/a/u/hospital/"+id+"?"+params
        },
        addHospital_url: function () {
            return "/a/u/hospital"
        },
        // 合作医院的医师管理
        hospitalDoctor_url: function () {
            return "/a/u/certification/list"
        },
        // 患者版订单记录
        patientRecord_url: function () {
            return "/a/u/order/list"
         },
        // 患者版检测数据
        patientTestData_url: function () {
            return "/a/u/train/search"
        },
        //患者详情
        patientDetails_url: function(id) {
            return "/a/u/user/"+id
        },
        //医师详情
        doctorDetails_url: function(id) {
            return "/a/u/doctor/"+id
        },

        //方案模板
        planTemplate_url: function() {
            return "/a/u/search/template"
        },

        //医师的评价列表
        patientAppraisalList_url: function () {
            return "/a/u/search/comment"
        },

        deleteComment_url: function(id) {
            return "/a/u/comment/" + id
        },

        //医师评价详情
        appraisalDetails_url: function (id) {
            return "/a/u/comment/" + id
        },

        //医师的诊断记录
        diagnosisRecord_url: function () {
            return "/a/u/diagnosis"
        },

        //诊断详情
        diagnosisDetails_url: function (id) {
            return "/a/u/diagnosis/"+id
        },

        //医师交易明细
        transactionDetails_url: function () {
            return "/a/u/order/list"
        },

        // 内容管理
        contentList_url:function(){
            return "/a/u/article/search"
        },
        // 排序
        contentSort_url:function(){
            return "/a/u/article/sort"
        },
        // 上下线
        contentUpDown_url:function(id){
            return "/a/u/article/"+id+"/status"
        },
        // 删除
        contentDelete_url:function(id){
            return "/a/u/article/"+id
        },
        // 新增
        contentPost_url:function(){
            return "/a/u/article"
        },

        // 运营管理
        // 参数设置列表
        paramList_url:function(){
            return "/a/u/constant/search"
        },
        // 参数设置详情
        paramDetail_url:function(cid){
            return "/a/u/constant/"+cid
        },
        // 参数设置详情
        addParam_url:function(){
            return "/a/u/constant/"
        },
        // 消息列表
        messageList_url:function(){
            return "/a/u/message/list"
        },
        // 消息详情
        messageDetails_url:function(id){
            return "/a/u/message/"+id
        },
        // 新增消息
        newMessage_url:function (){
            return "/a/u/message"
        },
        // 编辑消息
        putMessage_url:function (id){
            return "/a/u/message/"+id
        },
        // 删除消息
        deleteMessage_url:function (id){
            return "/a/u/message/"+id
        },
        // 意见反馈列表
        opinionList_url:function(){
            return "/a/feedback/search"
        },
        // 意见反馈详情
        opinionDetails_url:function(id){
            return "/a/feedback/"+id
        },
        // 删除意见反馈
        opinionDelete_url:function(id){
            return "/a/u/feedback/"+id
        },
        // 版本列表
        versionList_url:function(){
            return "/a/u/version/list"
        },
        // 版本详情
        versionDetails_url:function(id){
            return "/a/u/version/"+id
        }
    }
});
