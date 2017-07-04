angular.module("admin").
    // 认证管理常理常量
    constant("approvedManage",{
        // 职称
        positionalTitle:[
            {type: 1, name: '主任医师'},
            {type: 2, name: '副主任医师'},
            {type: 3, name: '主治医师'},
            {type: 4, name: '其他'}
        ]
});
