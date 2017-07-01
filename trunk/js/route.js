'use strict';
angular.module('admin').config(projectRouteConfig);
function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });

    //更改url格式配置为html5，去掉#号
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider

        .state('field', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/admin/mainController.js',
                    'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js',
                    // 'js/directives/searchParams/search-params.js',
                    'js/directives/ptteng-user/ptteng-user-0.0.1.js',
                    // 'page',
                    "js/directives/numberic/numberic.js"
                ])
            }
        })
        //欢迎页面
        .state('field.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html'
        })


        // 公共管理模块 (此处可以配置 但是不要删除 若操作记录没有的话 可以删除掉)
        // 登录登出
        .state('login', {
            url: '/login',
            templateUrl: 'views/admin/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/admin/loginController.js')
            }
        })

        //后台管理开始
        //用户管理
        .state('field.manager', {
            url: '/manager?page',
            templateUrl: 'views/admin/manager.html',
            controller: 'ManagerCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerController-0.0.1.js')
            }
        })
        //用户新增
        .state('field.managerDetail', {
            url: '/managerDetail/:id',
            templateUrl: 'views/admin/managerDetail.html',
            controller: 'ManagerDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js')
            }
        })
        //角色管理
        .state('field.role', {
            url: '/role/:page',
            templateUrl: 'views/admin/role.html',
            controller: 'RoleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleController-0.0.1.js')
            }
        })
        //角色新增
        .state('field.roleDetail', {
            url: '/roleDetail/:id',
            templateUrl: 'views/admin/roleDetail.html',
            controller: 'RoleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleDetailController-0.0.1.js')
            }
        })
        //模块管理
        .state('field.module', {
            url: '/module?page&size',
            templateUrl: 'views/admin/module.html',
            controller: 'ModuleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleController-0.0.1.js')
            }
        })
        //模块新增
        .state('field.moduleDetail', {
            url: '/moduleDetail/:id',
            templateUrl: 'views/admin/moduleDetail.html',
            controller: 'ModuleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleDetailController-0.0.1.js')
            }
        })
        //密码修改
        .state('field.pwd', {
            url: '/pwd',
            templateUrl: 'views/admin/pwdSetting.html',
            controller: 'PwdCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-pwdController-0.0.1.js')
            }
        })
        //后台管理结束


        // 业务管理开始
        //用户管理-用户管理
        .state('field.user', {
            url: '/user',
            templateUrl: 'views/business/user.html',
            controller: 'UserCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        //用户管理-患者版
        .state('field.patientDetails', {
            url: '/patientDetails',
            templateUrl: 'views/business/patient/patientDetails.html',
            controller: 'PatientDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.patientRecord', {
            url: '/patientRecord',
            templateUrl: 'views/business/patient/patientRecord.html',
            controller: 'PatientRecordCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.patientTestData', {
            url: '/patientTestData',
            templateUrl: 'views/business/patient/patientTestData.html',
            controller: 'PatientTestDataCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 用户管理-医师版
        .state('field.doctorDetails', {
            url: '/doctorDetails',
            templateUrl: 'views/business/doctor/doctorDetails.html',
            controller: 'DoctorDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.planTemplate', {
            url: '/planTemplate',
            templateUrl: 'views/business/doctor/planTemplate.html',
            controller: 'PlanTemplateCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.diagnosisRecord', {
            url: '/diagnosisRecord',
            templateUrl: 'views/business/doctor/diagnosisRecord.html',
            controller: 'DiagnosisRecordCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.diagnosisDetails', {
            url: '/diagnosisDetails',
            templateUrl: 'views/business/doctor/diagnosisDetails.html',
            controller: 'DiagnosisDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        //医师版-患者评价
        .state('field.patientAppraisal', {
            url: '/patientAppraisal',
            templateUrl: 'views/business/doctor/patientAppraisal.html',
            controller: 'PatientAppraisalCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.appraisalDetails', {
            url: '/appraisalDetails',
            templateUrl: 'views/business/doctor/appraisalDetails.html',
            controller: 'AppraisalDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.transactionDetails', {
            url: '/transactionDetails',
            templateUrl: 'views/business/doctor/transactionDetails.html',
            controller: 'TransactionDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 业务管理-认证管理
        .state('field.approvedList', {
            url: '/approvedList',
            templateUrl: 'views/business/approvedList.html',
            controller: 'ApprovedListCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.approvedDetails', {
            url: '/approvedDetails',
            templateUrl: 'views/business/approvedDetails.html',
            controller: 'ApprovedDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 业务管理-合作医院管理
        .state('field.hospitalList', {
            url: '/hospitalList',
            templateUrl: 'views/business/hospitalList.html',
            controller: 'HospitalListCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.hospitalEdit', {
            url: '/hospitalEdit',
            templateUrl: 'views/business/hospitalEdit.html',
            controller: 'HospitalEditCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.hospitalDoctor', {
            url: '/hospitalDoctor',
            templateUrl: 'views/business/hospitalDoctor.html',
            controller: 'HospitalDoctorCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 业务管理结束

        // 内容管理开始
        .state('field.contentList', {
            url: '/contentList',
            templateUrl: 'views/content/contentList.html',
            controller: 'ContentListCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.contentEdit', {
            url: '/contentEdit',
            templateUrl: 'views/content/contentEdit.html',
            controller: 'ContentEditCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 内容管理结束

        // 运营管理开始
        .state('field.parameterSetting', {
            url: '/parameterSetting',
            templateUrl: 'views/operation/parameterSetting.html',
            controller: 'ParameterSettingCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.messageList', {
            url: '/messageList',
            templateUrl: 'views/operation/messageList.html',
            controller: 'MessageListCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.messageEdit', {
            url: '/messageEdit',
            templateUrl: 'views/operation/messageEdit.html',
            controller: 'MessageEditCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.versionManagement', {
            url: '/versionManagement',
            templateUrl: 'views/operation/versionManagement.html',
            controller: 'VersionManagementCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.versionUpdate', {
            url: '/versionUpdate',
            templateUrl: 'views/operation/versionUpdate.html',
            controller: 'VersionUpdateCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.opinionList', {
            url: '/opinionList',
            templateUrl: 'views/operation/opinionList.html',
            controller: 'OpinionListCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        .state('field.opinionDetails', {
            url: '/opinionDetails',
            templateUrl: 'views/operation/opinionDetails.html',
            controller: 'OpinionDetailsCtrl',
            controllerAs: 'vm',
            // resolve: {
            //     loadMyFile: _lazyLoad([
            //         '',
            //     ])
            // }
        })
        // 运营管理结束

}
