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
        //改变患者冻结状态接口
        changePatientStatus: function(id) {
            return $http.put(address.changePatientStatus_url(id))
        },
        //改变医师冻结状态接口
        changeDoctorStatus: function(id) {
            return $http.put(address.changeDoctorStatus_url(id))
        },
        //改变用户手机号
        changeUserMobile: function(id,Mobile) {
            return $http.get(address.changeUserMobile_url(id,Mobile))
        },

        //患者列表
        getPatientList: function (data) {
            return $http.get(address.patientList_url(),{params:data})
        },
        //医师列表
        getDoctorList: function (data) {
            return $http.get(address.doctorList_url(),{params:data})
        },

        //医师详情 其实应该和患者详情是同一个接口，先这样写好测假数据，等后端接口好了再改
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
        diagnosisRecord:function(id) {
            return $http.get(address.diagnosisRecord_url(id))
        },

        //诊断详情
        diagnosisDetails:function (id) {
            return $http.get(address.diagnosisDetails_url(id))
        },

        //医师交易明细
        transactionDetails:function(id) {
            return $http.get(address.transactionDetails_url(id))
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
        // 立即上线、存为草稿
        editHospital: function (id,data) {
            return $http.put(address.editHospital_url(id),{params:data})
        },
        addHospital: function (data) {
            return $http.post(address.addHospital_url(),{params:data})
        },
        // 合作医院医师管理
        getHospitalDoctor: function (data) {
            return $http.get(address.hospitalDoctor_url(),{params:data})
        },
        // 患者版订单记录
        getPatientRecord: function (id,data) {
            return $http.get(address.patientRecord_url(id),{params:data})
        },
        // 患者版检测数据
        getPatientTestData: function (id,data) {
            return $http.get(address.patientTestData_url(id),{params:data})
        },
        // 审核医师的认证
        Approvedcheck: function (id,data) {
            return $http.get(address.approvedcheck_url(id),{params:data})
        },

        // 内容管理

        // 获取内容列表
        getContentList:function(param){
            return $http.get(address.contentList_url())
        },

        // 运营管理
        // 参数设置

        // 获取信息列表
        getMessageList:function(param){
            return $http.get(address.messageList_url())
        },
        // 意见反馈列表
        getOpinionList:function(param){
            return $http.get(address.opinionList_url())
        },
        // 获取版本列表
        getVersionList:function(){
            return $http.get(address.versionList_url())
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





