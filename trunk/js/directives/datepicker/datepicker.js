"use strict";
var indexOf = [].indexOf || function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    };

angular.module("admin")



    .directive("datepicker", ['$rootScope','$state',"$locale", "$location", "$filter", "$modal", "datePickerUtils","lessonService","bookService","unitService","courseService","coursewareService",
        function ($rootScope,$state, $locale, location, $filter, $modal, dateUtils, lessonService, bookService, unitService, courseService, coursewareService) {
        var vm=this;
        return {
            require: "ngModel",
            restrict: "EA",
            scope: {
                date: "=ngModel",
                grade: "=",
                status: "=",
                onSelect: "&",
                weekStartsOn: "=",
                noExtraRows: "=",
            },
            template:
            '<div class="pickadate-top"></div>' +
            '<div class="pickadate-header">' +
            '<div class="special"><button ng-click="prevMonth()" class="btn btn-primary">上一个月</button></div>' +
            '<div class="special"><h3 class="pickadate-centered-heading">' +
            '{{yearMonth}}' +
            '</h3></div>' +
            '<div class="special"><button ng-click="nextMonth()" class="btn btn-primary">下一个月</button></div>' +

            '</div>' +
            '<div class="pickadate-weeks">' +
            '<div class="pickadate-week" ng-repeat="week in dayName">{{week}}</div>' +
            '</div>' +
            '<div class="pickadate-body">' +
            '<div class="pickadate-main">' +
            '<ul class="pickadate-cell">' +
            //'<li bindonce ng-repeat="d in dates"  ng-click="setDate(d, month)">' +
            '<li bindonce ng-repeat="d in dates" ng-click="showModal(d)">' +
            '<div class="{{d.className}}" >' +
            '<b>{{d.dateObj | date:"d"}}</b>' +
                '<span class="ellipsis margin-bottom-5">{{d.data.uname}}</span>' +
                '<p class="ellipsis">{{d.data.wname}}</p>'+
            '</div></li>' +
            '</ul>' +
            '</div>' +
            '</div>'
            ,


            link: function (scope, element, attrs, ngModel) {
                var weekStartsOn = scope.weekStartsOn || 0,
                    noExtraRows = attrs.hasOwnProperty("noExtraRows"),
                    today = $filter("date")(new Date(), "yyyy-MM-dd")
                    ;

                // 一周伊始于
                if (!angular.isNumber(weekStartsOn) || weekStartsOn < 0 || weekStartsOn > 6) {
                    weekStartsOn = 0;
                }
                scope.dayName = dateUtils.buildDayNames(weekStartsOn);
                // 年月
                scope.yearMonth = $filter('date')(new Date(), 'yyyy-MM');
                //scope.yearMonth = "2016-03";
                scope.render = function () {
                    // 创建每月的数据
                    buildMonth(scope.yearMonth);
                };

                // 课程安排
                lessonHttp();
                // 课件数据
                coursewareData();
                //课程信息
                courseData();

                console.log($rootScope.globalPermission);
                    // 点击后样式重置
                scope.setDate = function (dateObj, month) {
                    if (isDateDisabled(dateObj)) {
                        return;
                    }
                    ngModel.$setViewValue(dateObj.date);

                    scope.selectedDate = dateObj.date;

                    angular.forEach(scope.dates, function (value, key) {
                        for (var j = 0, len = scope.dates[key].length; j < len; j++) {
                            if (scope.dates[key][j].className == "pickadate-selected") {
                                scope.dates[key][j].className = 'pickadate-enabled';
                            }
                            if (scope.dates[key][j].date == today) {
                                scope.dates[key][j].className = "pickadate-active";
                            }
                            if (scope.dates[key][j].date == dateObj.date && dateObj.date.indexOf(key) > -1) {
                                scope.dates[key][j].className = "pickadate-selected";
                            }

                        }
                    });
                    scope.onSelect();
                };

                ////权限获取，设置
                //var moduleId = JSON.parse($cookies.records).moduleID;
                //console.log($cookies.records);
                //var modulePermission = $rootScope.permissionSet[moduleId];
                //console.log(modulePermission.in_array("create"));
                //
                //scope.created = modulePermission.in_array("create");
                //scope.updated = modulePermission.in_array("update");
                //scope.deleted = modulePermission.in_array("delete");
                //scope.sorted = modulePermission.in_array("sort");




                // 弹出排课框
                //showModal(data);
                //alert(123);
                scope.showModal = function(dateObj) {
                    console.log(dateObj);
                    // 判断翻页状态
                    scope.cwarePage.isPrev();
                    scope.cwarePage.isNext();


                    console.log($rootScope.globalPermission);
                    scope.Permission = $rootScope.globalPermission;
                    console.log(scope.Permission);

                    // 初始化将要提交的参数
                    scope.params = {};

                    // 已选排课加入scope
                    scope.selectedItem = dateObj;

                    var title = "";
                    if (scope.selectedItem.data) {
                        title = "编辑课程";
                        lessonDetailData(scope.selectedItem.data.id);
                        scope.params.id = scope.selectedItem.data.id;
                        scope.lessonstart = new Date(parseInt(scope.selectedItem.data.startAt));
                        scope.lessonend = new Date(parseInt(scope.selectedItem.data.endAt));
                    } else {
                        title = "新增课程";
                    }

                    // 弹出
                    scope.myModal = $modal({scope: scope, templateUrl:'views/template/lesson-modal.html', title: title, show: false});
                    scope.myModal.$promise.then(scope.myModal.show);
                };

                scope.prevMonth = function() {
                    var prev = new Date((new Date(scope.yearMonth)).getFullYear(), (new Date(scope.yearMonth)).getMonth() - 1, 1, 3);
                    scope.yearMonth = $filter('date')(prev, 'yyyy-MM');
                    buildMonth(scope.yearMonth);
                    lessonHttp();
                };
                scope.nextMonth = function() {
                    var next = new Date((new Date(scope.yearMonth)).getFullYear(), (new Date(scope.yearMonth)).getMonth() + 1, 1, 3);
                    scope.yearMonth = $filter('date')(next, 'yyyy-MM');
                    buildMonth(scope.yearMonth);
                    lessonHttp();
                };

                ngModel.$render = function () {
                    scope.render();

                };

                function isDateDisabled(dateObj) {
                    return (/pickadate-disabled/.test(dateObj.className));
                }

                function buildMonth(item) {
                    scope.dates = {};
                    var initDate = new Date((new Date(item)).getFullYear(), (new Date(item)).getMonth(), 1, 3);
                    var currentMonth = initDate.getMonth() + 1;
                    var allDates = dateUtils.buildDates(initDate, {weekStartsOn: weekStartsOn, noExtraRows: true});
                    var dates = [];

                    for (var i = 0; i < allDates.length; i++) {
                        var className = "pickadate-enabled",
                            dateObj = allDates[i],
                            date = $filter("date")(dateObj, "yyyy-MM-dd");
                        // 非当前月的灰掉
                        if ($filter('date')(dateObj, "M") !== currentMonth.toString()) {
                            className = "pickadate-hide pickadate-disabled";
                        }
                        // 今天的颜色不一样
                        if (date === today && $filter("date")(dateObj, "M") === currentMonth.toString()) {
                            className = "pickadate-active";
                        }
                        // 选中的颜色不一样
                        //if (date === scope.date && date.indexOf(item) > -1) {
                        //    className = "pickadate-selected";
                        //}
                        dates.push({date: date, dateObj: dateObj, className: className});
                    }
                    scope.dates = dates;
                }

                function lessonHttp() {
                    var year = scope.yearMonth.split('-')[0];
                    var month = scope.yearMonth.split('-')[1] - 1;
                    var params = {
                        startAt: new Date(year, month, 1, 0).getTime(),
                        endAt: new Date(year, month, dateUtils.getMonthDate(year, month), 23, 59, 59).getTime(),
                        grade: scope.grade,
                        size: 32,
                        status: 1
                    };
                    lessonService.getList(params).then(function(res) {
                        if (res.data.code !== 0) {return false;}
                        angular.forEach(res.data.data, function(item, index) {
                            var date = $filter('date')(item.startAt, "yyyy-MM-dd");
                            angular.forEach(scope.dates, function(it, i) {
                                if (it.date === date) {
                                    angular.extend(it, {data: item});
                                }
                            });
                        });
                    });
                }

                /*
                *
                *
                *
                *
                * */


                // 课件翻页
                scope.cwarePage = {
                    defaultLength: 9,
                    total: function() {
                        return scope.cwareList ? scope.cwareList.length : 0
                    },
                    current: 1,
                    nextDisabled: true,
                    prevDisabled: true,
                    isNext: function() {
                        this.nextDisabled = this.total() <= this.defaultLength * this.current;
                    },
                    isPrev: function() {
                        this.prevDisabled = this.current <= 1;
                    },
                    showNext: function() {
                        this.current++;
                        this.isNext();
                        this.isPrev();
                    },
                    showPrev: function() {
                        this.current--;
                        this.isNext();
                        this.isPrev();

                    }
                };
                scope.cwareListRange = function() {
                    var start = scope.cwarePage.defaultLength * (scope.cwarePage.current - 1);
                    var end = start + scope.cwarePage.defaultLength;
                    return scope.cwareList.slice(start, end);
                };

                // 课件选择
                scope.cwareSelect=function(item) {
                    if (item) {
                        scope.params.wid = item.id;
                    }
                };

                // 课程选择
                scope.selectAction = function(seletedvalue) {
                    if (seletedvalue) {
                        scope.params.cid = parseInt(seletedvalue);
                    }
                };

                // 提交课程安排
                scope.submitLesson = function(startTime, endTime){
                    scope.params.startAt = dateUtils.getDateByTime(scope.selectedItem.date, startTime);
                    scope.params.endAt = dateUtils.getDateByTime(scope.selectedItem.date, endTime);
                    scope.params.status = 1;

                    //alert(typeof (scope.params.startAt));
                    //alert(scope.params.endAt);
                    if(scope.params.startAt < scope.params.endAt){

                        if (scope.selectedItem.data) {
                            // 更新
                            lessonService.update(scope.params.id, scope.params).then(function(res) {
                                if (res.data.code === 0) {
                                    $rootScope.alert("更新信息成功", scope.myModal.$promise.then(scope.myModal.hide));
                                    lessonHttp();
                                } else {
                                    $rootScope.alert(res.data.message);
                                }
                            });
                        } else {
                            // 新增
                            lessonService.add(scope.params).then(function (res) {
                                if (res.data.code === 0) {
                                    $rootScope.alert("增加信息成功", scope.myModal.$promise.then(scope.myModal.hide));
                                    lessonHttp();
                                } else {
                                    $rootScope.alert(res.data.message);
                                }
                            });
                        }
                    }
                    else {
                        $rootScope.alert("开始时间不能大于结束时间");
                    }
                };

                // 删除
                scope.del = function() {
                    lessonService.del(scope.params.id).then(function(res) {
                        if (res.data.code === 0) {
                            $rootScope.alert("删除信息成功", function() {
                                scope.myModal.$promise.then(scope.myModal.hide);
                                lessonHttp();
                                scope.render();
                            });

                        }
                    })
                };


                //获取进入新增或者编辑界面的数据
                // 课件数据
                function coursewareData(){
                    var params = {
                        grade: scope.grade,
                        status: 1,
                        size: 65535
                    };
                    coursewareService.getList(params).then(function(res) {
                        if (res.data.code === 0) {
                            scope.cwareList = res.data.data.list;
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    });
                }
                //获取课程信息
                function courseData(){
                    var params = {
                        grade: scope.grade,
                        status: 1,
                        size: 65535
                    };
                    courseService.getList(params).then(function(res) {
                        if (res.data.code === 0) {
                            scope.courseList = res.data.data;
                        } else {
                            $rootScope.alert(res.data.message);
                        }
                    });
                }
                // 获取排课详情，否则没有cid wid
                function lessonDetailData(id) {
                    lessonService.get(id).then(function(res) {
                        if (res.data.code === 0) {
                            //scope.params.uid = res.data.data.uid;
                            scope.params.cid = res.data.data.cid;
                            scope.params.wid = res.data.data.wid;
                        }
                    })
                }


            }
        };
    }]);
