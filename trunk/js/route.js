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

    // 更改url格式配置为html5，去掉#号
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider

        .state('field', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm',
            abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/admin/ptteng-mainController-0.0.1.js',
                    'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js',
                    'js/directives/searchParams/search-params.js',
                    'js/directives/ptteng-user/ptteng-user-0.0.1.js',
                    'page',
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
            controller: 'LoginCtrl',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/admin/ptteng-loginController-0.0.1.js')
            }
        })

        //后台管理开始
        //用户管理
        .state('field.manager', {
            url: '/manager/:page/:size/:next',
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
        // .state('field.managerCheck', {
        //     url: '/managerCheck/:id',
        //     templateUrl: 'views/admin/managerCheck.html',
        //     controller: 'ManagerDetailCtrl',
        //     resolve: {
        //         loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js')
        //     }
        // })
        //角色管理
        .state('field.role', {
            url: '/role/:page/:size/:next',
            templateUrl: 'views/admin/role.html',
            controller: 'RoleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleController-0.0.1.js')
            }
        })
        //角色新增
        .state('field.roleDetail', {
            url: '/roleDetail/:id/:name',
            templateUrl: 'views/admin/roleDetail.html',
            controller: 'RoleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleDetailController-0.0.1.js')
            }
        })
        //模块管理
        .state('field.module', {
            url: '/module/:page/:size/:next',
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
            templateUrl: 'views/admin/pwd.html',
            controller: 'PwdCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-pwdController-0.0.1.js')
            }
        })
        //后台管理结束


        // 业务管理开始


        //患者列表页
        .state('field.patientList', {
            url: '/patientList/:page/:size?&registerFrom&registerTo&ageFrom&ageTo&accountStatus&mobile&name',
            templateUrl: 'views/business/patientList.html',
            controller: 'PatientListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/patientList.js'
                ])
            }
        })

        //医师列表页
        .state('field.doctorList', {
            url: '/doctorList/:page/:size?&registerFrom&registerTo&ageFrom&ageTo&accountStatus&mobile&name',
            templateUrl: 'views/business/doctorList.html',
            controller: 'DoctorListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctorList.js'
                ])
            }
        })

        //用户管理-患者版
        .state('field.patientDetails', {
            url: '/patientDetails?&id',
            templateUrl: 'views/business/patient/patientDetails.html',
            controller: 'PatientDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/patient/patientDetails.js'
                ])
            }
        })
        .state('field.patientRecord', {
            url: '/patientRecord?pid&page&size&product&type&status&amountStart&amountEnd&payStartAt&payEndAt',
            templateUrl: 'views/business/patient/patientRecord.html',
            controller: 'PatientRecordCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/patient/patientRecord.js'
                ])
            }
        })
        .state('field.patientTestData', {
            url: '/patientTestData?pid&page&size&startAt&endAt',
            templateUrl: 'views/business/patient/patientTestData.html',
            controller: 'PatientTestDataCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/patient/patientTestData.js'
                ])
            }
        })
        .state('field.patientReportDetails', {
            url: '/patientReportDetails?id',
            templateUrl: 'views/business/patient/patientReportDetails.html',
            controller: 'PatientReportDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/patient/patientReportDetails.js'
                ])
            }
        })
        //医师详情
        .state('field.doctorDetails', {
            url: '/doctorDetails?id',
            templateUrl: 'views/business/doctor/doctorDetails.html',
            controller: 'DoctorDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/doctorDetails.js'
                ])
            }
        })
        //方案模板
        .state('field.planTemplate', {
            url: '/planTemplate/:page/:size?did?name&createFrom&createTo&countFrom&countTo',
            templateUrl: 'views/business/doctor/planTemplate.html',
            controller: 'PlanTemplateCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/planTemplate.js'
                ])
            }
        })
        //诊断记录
        .state('field.diagnosisRecord', {
            url: '/diagnosisRecord/:page/:size?did&name&createFrom&createTo&mobile',
            templateUrl: 'views/business/doctor/diagnosisRecord.html',
            controller: 'DiagnosisRecordCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/diagnosisRecord.js'
                ])
            }
        })
        //诊断详情
        .state('field.diagnosisDetails', {
            url: '/diagnosisDetails?id&did',
            templateUrl: 'views/business/doctor/diagnosisDetails.html',
            controller: 'DiagnosisDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/diagnosisDetails.js'
                ])
            }
        })
        //医师版-患者评价
        .state('field.patientAppraisal', {
            url: '/patientAppraisal/:page/:size?did&createFrom&createTo&mobile&name&star',
            templateUrl: 'views/business/doctor/patientAppraisal.html',
            controller: 'PatientAppraisalCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/patientAppraisal.js'
                ])
            }
        })
        //评价详情
        .state('field.appraisalDetails', {
            url: '/appraisalDetails?id&did',
            templateUrl: 'views/business/doctor/appraisalDetails.html',
            controller: 'AppraisalDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/appraisalDetails.js',
                ])
            }
        })
        //交易明细
        .state('field.transactionDetails', {
            url: '/transactionDetails/:page/:size?did?payStartAt?payEndAt?amountStart?amountEnd?status?type',
            templateUrl: 'views/business/doctor/transactionDetails.html',
            controller: 'TransactionDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/doctor/transactionDetails.js'
                ])
            }
        })
        // 业务管理-认证管理
        .state('field.approvedList', {
            url: '/approvedList/:page/:size?mobile&name&status&applyFrom&applyTo',
            templateUrl: 'views/business/approvedList.html',
            controller: 'ApprovedListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/approvedList.js'
                ])
            }
        })
        .state('field.approvedDetails', {
            url: '/approvedDetails?id',
            templateUrl: 'views/business/approvedDetails.html',
            controller: 'ApprovedDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/approvedDetails.js'
                ])
            }
        })
        // 业务管理-合作医院管理
        .state('field.hospitalList', {
            url: '/hospitalList/:page/:size?name&grade&status&totalFrom&totalTo&province&city',
            templateUrl: 'views/business/hospitalList.html',
            controller: 'HospitalListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/hospitalList.js',
                    "area-selcet"
                ])
            }
        })
        .state('field.hospitalEdit', {
            url: '/hospitalEdit?id',
            templateUrl: 'views/business/hospitalEdit.html',
            controller: 'HospitalEditCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/hospitalEdit.js',
                    "area-selcet"
                ])
            }
        })
        .state('field.hospitalDoctor', {
            url: '/hospitalDoctor?hid&hName&page&size&name&mobile&accountStatus&createFrom&createTo&position',
            templateUrl: 'views/business/hospitalDoctor.html',
            controller: 'HospitalDoctorCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/business/hospitalDoctor.js'
                ])
            }
        })
        // 业务管理结束

        // 内容管理开始
        .state('field.contentListPatient', {
            url: '/contentListPatient/:page/:size/:type?title&startAt&endAt&createByName&status&author',
            templateUrl: 'views/content/contentList.html',
            controller: 'ContentListCtrl',
            controllerAs: 'vm',
            params:{type:'1'},
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/content/contentList.js',
                ])
            }
        })
        .state('field.contentListDoctor', {
            url: '/contentListDoctor/:page/:size/:type?title&startAt&endAt&createByName&status&author',
            templateUrl: 'views/content/contentList.html',
            controller: 'ContentListCtrl',
            controllerAs: 'vm',
            params:{type:'0'},
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/content/contentList.js',
                ])
            }
        })
        .state('field.contentEdit', {
            url: '/contentEdit/:id/:type',
            templateUrl: 'views/content/contentEdit.html',
            controller: 'ContentEditCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'vendor/umeditor/themes/default/css/umeditor.css',
                    'vendor/umeditor/umeditor.config.js',
                    'vendor/umeditor/umeditor.js',
                    'vendor/umeditor/lang/zh-cn/zh-cn.js',
                    'vendor/umeditor/metaUmeditor.js',
                    'js/controllers/content/contentEdit.js'
                ])
            }
        })
        // 内容管理结束

        // 运营管理开始
        .state('field.parameterSetting', {
            url: '/parameterSetting/:page/:size?type&value&name&startAt&endAt',
            templateUrl: 'views/operation/parameterSetting.html',
            controller: 'ParameterSettingCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/paranmeterSetting.js',
                ])
            }
        })
        .state('field.parameterSettingEdit', {
            url: '/parameterSettingEdit/:id',
            templateUrl: 'views/operation/parameterSettingEdit.html',
            controller: 'ParameterSettingEditCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/paranmeterSettingEdit.js',
                ])
            }
        })
        .state('field.messageList', {
            url: '/messageList/:page/:size?title&createByName&status&startAt&endAt&personType',
            templateUrl: 'views/operation/messageList.html',
            controller: 'MessageListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/messageList.js'
                ])
            }
        })
        .state('field.messageEdit', {
            url: '/messageEdit/:id',
            templateUrl: 'views/operation/messageEdit.html',
            controller: 'MessageEditCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/messageEdit.js',
                    '//cdn.bootcss.com/checklist-model/0.11.0/checklist-model.js'
                ])
            }
        })
        .state('field.versionManagement', {
            url: '/versionManagement',
            templateUrl: 'views/operation/versionManagement.html',
            controller: 'VersionManagementCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/versionManagement.js',
                ])
            }
        })
        .state('field.versionUpdate', {
            url: '/versionUpdate?id',
            templateUrl: 'views/operation/versionUpdate.html',
            controller: 'VersionUpdateCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/VersionUpdateCtrl.js',
                ])
            }
        })
        .state('field.opinionList', {
            url: '/opinionList/:page/:size?name&type&mobile&startAt&endAt&title',
            templateUrl: 'views/operation/opinionList.html',
            controller: 'OpinionListCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/opinionList.js',
                ])
            }
        })
        .state('field.opinionDetails', {
            url: '/opinionDetails?id',
            templateUrl: 'views/operation/opinionDetails.html',
            controller: 'OpinionDetailsCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/opinionDetails.js',
                ])
            }
        })
        // 运营管理结束

}