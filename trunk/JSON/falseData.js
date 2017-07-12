/**
 * Created by Free Wang on 2017/7/5.
 */
// 内容管理
var contentList = Mock.mock('/a/u/content/search',{
    code:0,
    data:{
        'contentList|10': [{
            'id|+1': 1,
            'title':'@ctitle(3, 7)',
            'author':'@ctitle(2, 4)',
            'createBy':'@first()',
            'status|0-1':0,
            'createAt':'@date'
        }],
        page: 1,
        size: 10,
        total: 11
    },
    message:'success'
});
var contentRank = Mock.mock('/a/u/content/rank',{
    code:0,
    message:'success'
});
var messageList = Mock.mock('/a/u/message/search',{
    code:0,
    data:{
        'messageList|10': [{
            'id|1-100': 1,
            'title':'@ctitle(3, 7)',
            'author':'@ctitle(2, 4)',
            'createBy':'@first()',
            'status|0-2':0,
            'peoples|0-4':0,
            'sendAt':'@datetime'
        }],
        page: 1,
        size: 10,
        total: 11
    },
    message:'success'
});
var opinionList = Mock.mock('/a/u/opinion/search',{
    code:0,
    data:{
        'opinionList|10': [{
            'id|1-100': 1,
            'name':'@cname()',
            'phone|6':1,
            'APP|0-1':0,
            'commitAt':'@date'
        }],
        page: 1,
        size: 10,
        total: 11
    },
    message:'success'
});
    // 版本列表
var versionList = Mock.mock('/a/u/version/search',{
    code:0,
    data:{
        'versionList|10': [{
            'id|1-100': 1,
            'name':'@cname()',
            'number|1-1':1,
            'version|0-1':1,
            'versionNumber|1.1-1.9':1,
            'force|0-1':'0'
        }],
        page: 1,
        size: 10,
        total: 11
    },
    message:'success'
});


//医师详情
var doctorDetail = Mock.mock('/a/user',{
    "code":0,
    "message":"success",
    "data": {
        "user": {
            'id|1-100': 1,
            'name':'@cname()',
            "idcard" : "429548745877487518",
            "mobile" : "15079581367",
            "registerTime|1499184000000-1499356800000" : 1499184000000,
            "income|0-999999" : 500000,
            "hospitalName" : '莆田医院',
            "position" : "教授",
            "qualifications" : "238293813829367892",
            "img" : ["@image()","@image()"],
            "bank":[{"bank" : "45454545455", "bankName" : "浦发银行"},
                {"bank" : "45454545455", "bankName" : "瑞士银行"}]
        }
    }
});

// 合作医院列表
var hospitalList = Mock.mock('/a/hospital/search',{
    code:0,
    data:{
        'hospitalList|10': [{
            'id|1-100': 1,
            'name':'北京东城中医医院',
            'grade|1-9':1,
            'total|1-100':1,
            'address':'@county(true)',
            'status|1-2':1,
            'province':'@province()',
            'city':'@city'
        }],
        page: 1,
        size: 10,
        total: 13
    },
    message:'success'
});
// 合作医院详情
var hospitalDetails = Mock.mock('/a/hospital',{
    code:0,
    data:{
        'id|1-100': 1,
        'name':'北京东城中医医院',
        'grade|1-9':1,
        'total|1-100':1,
        'address1':'@county(true)',
        'status|1-2':1,
        'province':'@province()',
        'city':'@city',
        'image':'@image()'
    },
    message:'success'
});
// 合作医院的医师列表
var hospitalDoctor = Mock.mock('/a/u/hospital/doctor',{
    code:0,
    data:{
        'doctorList|10': [{
            'uuid|1-100':1,
            'mobile|13974447000-13974447999':13974447000,
            'name':'@cname()',
            'position|1-4':1,
            'income|0-100.2':0,
            'status|0-1':1,
            'createAt|1499184000000-1499356800000':1499184000000
        }],
        page: 1,
        size: 10,
        total: 13
    },
    message:'success'
});

// 医师的患者评价列表
var PatientAppraisalList = Mock.mock('/a/PatientAppraisalLit',{
    code:0,
    data:{
        'list|10': [{
        'mobile': 15969785487,
        'name':'@cname()',
        'rate|1-5':1,
        'time': '@datetime'}
        ],
        page: 1,
        size: 10,
        total: 12
    },
    message:'success'
});
// 用户管理患者版-订单记录
var patientRecord = Mock.mock('/a/u/patientRecord',{
    code:0,
    data:{
        'recordList|10': [{
            'id|1-100': 1,
            'transaction_time|1499184000000-1499356800000':1499184000000,
            'product':'火热活血多段控制训练',
            'transaction_number':20171111092130213,
            'sum|1-100.2':1,
            'transaction_type': 0,
            'transaction_status|0-1':0,
            'transaction_way|0-1':0
        }
        ],
        page: 1,
        size: 10,
        total: 12
    },
    message:'success'
});

// 用户管理患者版-检测数据
var patientRecord = Mock.mock('/a/u/patientTestData',{
    code:0,
    data:{
        'testDataList|10': [{
            'training_time|1499184000000-1499356800000':1499184000000,
            'sensitivity|20-50':20,
            'hardness|20-50':20,
            'blood_flow|20-50':20,
            'duration|1-60':1,
            'age|20-50': 20,
            'completed_daily|0-20':0
        }
        ],
        page: 1,
        size: 10,
        total: 12
    },
    message:'success'
});

//医师的诊断记录
var diagnosisRecord = Mock.mock('/a/diagnosisRecord',{
    code:0,
    data:{
        'diagnosisRecord|10': [{
            'recordId':6487,
            'date|1499184000000-1499356800000':1499184000000,
            'planName':'今晚打老虎',
            'mobile':18698741557,
            'days|20-60': 60,
            'course|20-60':20,
            'strength|30-100':40,
            'interval':50,
            'detector': 20,
        }],
        page: 1,
        size: 10,
        total: 12
    },
    message:'success'
});

var diagnosisRecord = Mock.mock('/a/diagnosisDetails',{
    code:0,
    data:{
            'planName':'今晚打老虎',
            'mobile':18698741557,
            'days|20-60': 60,
            'course|20-60':20,
            'strength|30-100':40,
            'interval':50,
            'detector': 20,
            'result' : "多半是废了多半是废废了多半是废了多半是废了多半是废了多" +
            "半是废了多半是废了多半是废了废了多半是废了多半是废了多半是废了多半是废" +
            "了多半是废了多半是废了废了多半是废了多半是废了多半是废了多半是废了多半是废" +
            "了多半是废了废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是废了" +
            "废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了" +
            "多半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了多半是废了多半是" +
            "废了多半是废了多半是废了多半是废了废了多是半是废了多半是废了多半是废了多半是废了多" +
            "半是废了多半是废了废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是废了" +
            "废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了多半" +
            "是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了多半是废了多半是废了" +
            "多半是废了多半是废了多半是废了废了多半是废了多半是废了多半是废了多半是废了多半" +
            "是废了多半是废了废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是" +
            "废了废了多半是废了多半是废了多半是废了多半是废了多半是废了多半是废了废了多" +
            "半是废了多半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废" +
            "了多半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了多" +
            "半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了多" +
            "半是废了多半是废了多半是废了多半是废了多半是废了废了多半是废了"
    },
    message:'success'
});
