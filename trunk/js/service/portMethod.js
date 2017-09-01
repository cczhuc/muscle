angular.module("admin")
    .factory("portService",function ($http,address) {
    return {
        // 获取认证列表
        getApprovedList: function (data) {
            return $http.get(address.approvedList_url(),{params:data})
        },
        // 获取认证详情
        getApprovedDetails: function (id) {
            return $http.get(address.approvedDetails_url(id))
        },
        // 取消认证
        cancelApproved: function (id,data) {
            return $http.put(address.cancelApproved_url(id,data))
        },
        //改变用户冻结状态接口
        changeUserStatus: function(id) {
            return $http.put(address.changeUserStatus_url(id))
        },
        //改变手机号
        changeUserMobile: function(id,Mobile) {
            return $http.put(address.changeUserMobile_url(id,Mobile))
        },

        //患者列表
        getPatientList: function (data) {
            return $http.get(address.patientList_url(),{params:data})
        },
        //医师列表
        getDoctorList: function (data) {
            return $http.get(address.doctorList_url(),{params:data})
        },
        //患者详情
        getPatientDetails: function(id) {
            return $http.get(address.patientDetails_url(id))
        },
        //医师详情
        getDoctorDetails: function(id) {
            return $http.get(address.doctorDetails_url(id))
        },

        //方案模板
        planTemplate: function(data) {
            return $http.get(address.planTemplate_url(),{params:data})
        },

        //医师的评价列表
        patientAppraisalList: function(data) {
            return $http.get(address.patientAppraisalList_url(),{params:data})
        },

        //删除评价
        deleteComment: function(id) {
            return $http.delete(address.deleteComment_url(id))
        },

        //获取医师评价详情
        appraisalDetails:function(id) {
            return $http.get(address.appraisalDetails_url(id))
        },

        //医师的诊断记录
        diagnosisRecord:function(params) {
            return $http.get(address.diagnosisRecord_url(),{params:params})
        },

        //诊断详情
        diagnosisDetails:function (id) {
            return $http.get(address.diagnosisDetails_url(id))
        },

        //医师交易明细
        transactionDetails:function(params) {
            return $http.get(address.transactionDetails_url(),{params:params})
        },

        // 合作医院管理
        // 医院列表
        gerHospitalList: function (data) {
            return $http.get(address.hospitalList_url(),{params:data})
        },
        //改变医院上下线状态
        changeHospitalStatus: function(id,type,status) {
            return $http.put(address.changeHospitalStatus_url(id,type,status))
        },
        // 获取医院详情
        getHospitalDetails: function (id) {
            return $http.get(address.hospitalDetails_url(id))
        },
        // 新增医院、编辑医院
        editHospital: function (id,data) {
            return $http.put(address.editHospital_url(id,data))
        },
        addHospital: function (data) {
            return $http.post(address.addHospital_url(),data)
        },
        // 合作医院医师管理
        getHospitalDoctor: function (data) {
            return $http.get(address.hospitalDoctor_url(),{params:data})
        },
        // 患者版订单记录
        getPatientRecord: function (data) {
            return $http.get(address.patientRecord_url(),{params:data})
        },
        // 患者版检测数据
        getPatientTestData: function (data) {
            return $http.get(address.patientTestData_url(),{params:data})
        },

        // 内容管理

        // 获取内容列表
        getContentList:function(param){
            return $http.get(address.contentList_url(),{params:param})
        },
        // 修改content状态
        putContentStatus:function(id,params){
            return $http.post(address.contentUpDown_url(id))
        },
        // 删除content
        deleteContent:function(id){
            return $http.delete(address.contentDelete_url(id))
        },
        // 新增content
        postContent:function(params){
            return $http.post(address.contentPost_url(),params)
        },
        // 编辑content
        putContent:function(id,params){
            return $http.post(address.contentDelete_url(id),params)
        },
        // 获取单条信息
        getContentSlice:function(id){
            return $http.get(address.contentDelete_url(id))
        },
        // 拖动
        putSort:function(data){
            return $http({
                url:address.contentSort_url(),
                method:"POST",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                data: JSON.stringify(data),
                transformRequest: function (data, headersGetter) {
                    return data;
                }
            })
        },
        // 运营管理
        // 参数设置列表
        getParamList:function(param){
            return $http.get(address.paramList_url(),{params:param})
        },
        // 参数设置详情
        getParamDetail:function(id){
            return $http.get(address.paramDetail_url(id))
        },
        // 修改设置详情
        putParamDetail:function(id,data){
            return $http.put(address.paramDetail_url(id),data)
        },
        // 新增常量
        postParamDetail:function(data){
            return $http.post(address.addParam_url(),data)
        },
        // 获取信息列表
        getMessageList:function(param){
            return $http.get(address.messageList_url(),{params:param})
        },
        // 获取信息列表
        getMessageDetails:function(id){
            return $http.get(address.messageDetails_url(id))
        },
        // 新增信息
        postMessage:function(data){
            return $http.post(address.newMessage_url(),data)
        },
        // 编辑信息
        putMessage:function(id,data){
            return $http.post(address.newMessage_url(id),data)
        },
        // 删除信息
        deleteMessage:function(id){
            return $http.delete(address.deleteMessage_url(id))
        },
        // 意见反馈列表
        getOpinionList:function(param){
            return $http.get(address.opinionList_url(),{params:param})
        },
        // 意见反馈列表
        getOpinionDetails:function(id){
            return $http.get(address.opinionDetails_url(id))
        },
        // 删除意见
        OpinionDelete:function(id){
            return $http.delete(address.opinionDelete_url(id))
        },
        // 获取版本列表
        getVersionList:function(){
            return $http.get(address.versionList_url())
        },
        // 获取版本详情
        getVersionDetails:function(id){
            return $http.get(address.versionDetails_url(id))
        },
        // 更新版本
        putVersionDetails:function(id,data){
            return $http.put(address.versionDetails_url(id),data)
        }
    }
    })
    .factory('uploadService', function ($http,address) {
        return {
            uploadFile: function (FileUploader, alias) {
                var param = {url: address.upload_url()};
                if (alias) {
                    angular.extend(param, {alias: alias});
                }
                return new FileUploader(param);
            }
        }
    });





