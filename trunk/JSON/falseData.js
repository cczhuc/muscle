/**
 * Created by Free Wang on 2017/7/5.
 */
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
        'messageList|10': [{
            'id|1-100': 1,
            'name':'@cname()',
            'phone|6':1,
            'APP|+1':['医师版','患者版'],
            'commitAt':'@date'
        }],
        page: 1,
        size: 10,
        total: 11
    },
    message:'success'
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