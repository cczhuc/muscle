angular.module("admin")
    .directive('search', function () {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/searchParams/search-params.html',
            replace: true,
            scope: {
                params: '=',
                //需要+85399999
                timeFixArr: '=timeFixArr',
                end: "=",
                //点击搜索或者清空，会触发一个方法
                changeFn: "&?"
            },
            controller: function ($state, commonUtil, $scope) {

                // 搜索
                $scope.search = function () {

                    //对日历插件的时间处理
                    for (var i in $scope.params) {
                        for (var j in $scope.timeFixArr) {
                            if (i == $scope.timeFixArr[j]) {
                                //取到尾数毫秒
                                var unit = $scope.params[i]%10;
                                if (unit != 9) {
                                    $scope.params[i] = $scope.params[i] + 86400000 - 1;
                                }
                            }
                        }
                    }

                    //对page的处理
                    if ($scope.params.page) {
                        $scope.params.page = 1;
                    }


                    $scope.changeFn();
                    //strat :没有地址选择器时可以删除 将获取的对象拆开传到url里
                    console.log($scope.params.address1);
                    if ($scope.params.address1) {
                        $scope.params.province = $scope.params.address1.province;
                        $scope.params.city = $scope.params.address1.city;
                        // $scope.params.county = $scope.params.address.district;
                    }
                    //end :没有地址选择器时可以删除 将获取的对象拆开传到url里
                    // 这里的commonUtil.querySearchParams写的贼垃圾，不用了，直接在指令里面处理日期插件的终止时间
                    // $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});
                    $state.go($state.current, $scope.params, {reload: true});
                };
                //清空
                $scope.clean = function () {
                    console.log($scope.params.address1);
                    angular.forEach($scope.params, function (data, index) {
                        //三期添加了关于ID的选项，清除的时候不能清除ID
                        if (index !== 'size' && index !== 'id' && index !== 'hid' && index !=='dName' && index !=='hName' ) {
                            $scope.params[index] = '';
                        }
                    });
                    // $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});
                    $state.go($state.current, $scope.params, {reload: true});
                }
            }
        }
    });