angular.module("admin")
    .directive('search', function () {
        return {
            restrict: 'EA',
            templateUrl: 'js/directives/searchParams/search-params.html',
            replace: true,
            scope: {
                params: '=',
                //三期添加，点击搜索或者清空，会触发一个方法
                addFn:"&?"
            },
            controller: function ($state, commonUtil, $scope) {
                //搜索
                $scope.search = function () {
                    $scope.addFn();
                    //strat :没有地址选择器时可以删除 将获取的对象拆开传到url里
                    console.log($scope.params.address);
                    if ($scope.params.address) {
                        $scope.params.province = $scope.params.address.province;
                        $scope.params.city = $scope.params.address.city;
                        $scope.params.county = $scope.params.address.district;
                    }
                    //end :没有地址选择器时可以删除 将获取的对象拆开传到url里

                    $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});
                };
                //清空
                $scope.clean = function () {
                    console.log($scope.params.address);
                    $scope.addFn();
                    angular.forEach($scope.params, function (data, index) {
                        //三期添加了关于ID的选项，清除的时候不能清除ID
                        if (index !== 'size'&&index!== 'id') {
                            $scope.params[index] = '';
                        }
                    });
                    $state.go($state.current, commonUtil.querySearchParams($scope.params), {reload: true});

                }
            }
        }
    });