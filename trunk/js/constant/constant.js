angular.module("admin")
    // 认证管理常理常量
    .constant("approvedManage",{
        // 职称
        positionalTitle:[
            {type: 1, name: '主任医师'},
            {type: 2, name: '副主任医师'},
            {type: 3, name: '主治医师'},
            {type: 4, name: '其他'}
        ]
    })
    .constant("hospitalGrade",[
        {type:1,name:'三甲'},
        {type:2,name:'二甲'},
        {type:3,name:'一甲'},
        {type:4,name:'三乙'},
        {type:5,name:'二乙'},
        {type:6,name:'一乙'},
        {type:7,name:'三丙'},
        {type:8,name:'二丙'},
        {type:9,name:'一丙'}
    ])

