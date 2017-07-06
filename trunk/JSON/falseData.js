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