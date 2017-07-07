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
        cancelApproved: function (id) {
            return $http.get(address.cancelApproved_url(id))
        },
        //改变冻结状态接口
        changeUserStatus: function(id,type,status) {
            return $http.get(address.changeUserStatus_url(id,type,status))
        },
        //改变用户手机号
        changeUserMobile: function(id,Mobile) {
            return $http.get(address.changeUserMobile_url(id,Mobile))
        },

        //用户列表
        getUserList: function (data) {
            return $http.get(address.userList_url(),{params:data})
        },

        //医师详情 其实应该和患者详情是同一个接口，先这样写好测假数据，等后端接口好了再改
        getDoctorList: function(id) {
            return $http.get(address.doctorDetails_url(id))
        },

        // 合作医院管理
        // 医院列表
        gerHospitalList: function (data) {
            return $http.get(address.hospitalList_url(),{params:data})
        },
        //改变医院上下线状态
        changeHospitalStatus: function(id,type,status) {
            return $http.get(address.changeHospitalStatus_url(id,type,status))
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
        getHospitalDoctor: function (id) {
            return $http.get(address.hospitalDoctor_url(id))
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
            }
            // 意见反馈
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


