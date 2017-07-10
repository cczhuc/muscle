/**
 * Created by Free Wang on 2017/7/5.
 */
// 内容管理
    // 内容列表
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

// 运营管理
    // 信息列表
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
    // 意见列表
var opinionList = Mock.mock('/a/u/opinion/search',{
    code:0,
    data:{
        'opinionList|10': [{
            'id|1-100': 1,
            'name':'@cname()',
            'phone|13345678912-18899999999':1,
            'version|0-1':0,
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
