'use strict';

angular.module('admin')

    .factory('commonUtil', function ($rootScope, $state) {
        return {
            pageDefault: {page: 1, size: 10, next: true},

            //搜索
            search: function (param) {
                $state.go($state.current, param, {reload: true})
            },

            //清除
            clean: function (param) {
                angular.forEach(param, function (data, index) {
                    param[index] = '';
                });
                console.log(param);

                return param
            },

            getSubCategoryFn: function (id) {
                for (var i = 0; i < categoryData.length; i++) {
                    if (id == categoryData[i].id) {
                        return categoryData[i].subCategory;
                    }
                }
            },

            // 时间戳处理
            querySearchParams: function (params) {
                for (var k in params) {
                    if (params[k] instanceof Date) {
                        params[k] = new Date(params[k]).getTime();
                        console.log("params[k]",params[k]);
                    }
                    // 处理 结束时间 那天末尾
                    if ((k.toLowerCase().indexOf('end') != -1||k.toLowerCase().indexOf('to') != -1) && params[k]) {
                        var timeString = String(params[k]);
                        console.log('timeString',timeString);
                        var str = timeString.substring(timeString.length - 1, timeString.length);
                        console.log('str',str);
                        if (str != '9') {
                            params[k] = params[k] + 86400000 - 1;
                        }

                    }
                    if (k === 'page') {
                        params[k] = 1;
                    }
                }
                return params;
            },


            process4Page: function (params) {
                if (params == undefined) {
                    params = {};
                } else {

                }
                if (params.page == undefined) {
                    params.page = $state.params.page || this.pageDefault.page;
                }
                if (params.size == undefined) {
                    params.size = $state.params.size || this.pageDefault.size;
                }
                if (params.next == undefined) {
                    params.next = $state.params.next || this.pageDefault.true;
                }
                return {"params": params};
            },

            processPageResult: function (res) {
                $state.params.next = res.data.data.next;
                return res;
            },

            setPage: function (res) {
                this.page = {current: res.data.data.page, size: res.data.data.size, next: res.data.data.next}
            },

            resetPage: function () {
                this.page = {current: 1, size: 5, next: true}
            },

            page: {current: 1, size: 5, next: true},
            concactArrayParam: function (name, params) {
                var tempUrls = "?";
                angular.forEach(params, function (data, index, array) {
                    tempUrls = tempUrls + name + "=" + data + "&";
                });
                var url = tempUrls.substring(0, tempUrls.length - 1);
                return url;
            },

            showErrMsg: function (res) {
                if (res.data.code == -5020) {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + " get error  message is " + res.data.message);
                        $state.go("login", {}, {reload: true});
                    });
                } else {
                    $rootScope.alert(res.data.message, function () {
                        console.log(res.data.code + " get error  message is " + res.data.message);
                    });
                }


            },

            showReturnMsg: function (res, path) {
                switch (res.data.code) {
                    case 0:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                            if (path == undefined) {

                            } else {
                                $state.go(path, {}, {reload: true});
                            }
                        });
                        break;
                    case -5020:
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                            $state.go("login", {}, {reload: true});
                        });
                        break;
                    default :
                        $rootScope.alert(res.data.message, function () {
                            console.log(res.data.code + " get error  message is " + res.data.message);
                        });
                }

            },
            isUpdate: function (id) {
                if (id == undefined) {
                    return false;
                } else {
                    return true;
                }
            },

            // 处理模块列表数据，将map添加进list结果
            buildTree: function (modules) {
                var tree = [];
                return this.buildTreeNode(0, null, tree, modules);
            },

            buildTreeNode: function (pid, node, tree, modules) {
                var now = this;
                angular.forEach(modules, function (data, index, array) {
                    var module = data;
                    if (module.parentID == pid) {
                        tree = now.buildTreeNode(module.id, module, tree, modules);
                        if (pid == 0) {
                            tree.push(module);
                        } else {
                            if (node.nodes == undefined) {
                                node.nodes = [];
                            }
                            node.nodes.push(module);
                        }
                    }
                });
                tree = tree.sort(now.treeSort);
                angular.forEach(tree, function (item, index) {
                    if (item.nodes) {
                        item.nodes = item.nodes.sort(now.treeSort);
                    }
                });
                return tree;
            },

            treeSort: function (a, b) {
                if (a.level < b.level)
                    return -1;
                else if (a.level > b.level)
                    return 1;
                else
                    return 0;
            },

            arrayContains: function (array, obj) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === obj) {
                        return true;
                    }
                }
                return false;
            },

            // 公司行业数据 转换为 下拉多选数据
            companyIndustryTransform: function (companyIndustryGroup, industryList) {
                companyIndustryGroup.map(function (item) {
                    var isticked = industryList.some(function (industry) {
                        return ~~item.industry === ~~industry.industry;
                    });
                    return item.ticked = isticked;
                });
                return companyIndustryGroup
            },

            // 下拉多选数据 转换为 公司行业数据
            selectIndustryListTransform: function (industryList, selectedIndustryGroup) {
                industryList = selectedIndustryGroup.map(function (item) {
                    if (item.ticked === true) {
                        var x = item.industry;
                        item = {};
                        item.industry = x;
                        return item
                    } else {
                        item.clear();
                    }
                });
                return industryList;
            },

            // 省市区数据转换
            areaTransform: function (newarea, oldarea, type) {
                newarea.province = oldarea.province;
                newarea.city = oldarea.city;
                if (type === 0) {
                    newarea.district = oldarea.county
                } else {
                    newarea.county = oldarea.district
                }
            },
            // 省市区地址数据处理
            areaDateTransform: function (province, city, county) {
                if (province || city || county) {
                    var address1 = {};
                    address1.province = province || "";
                    address1.city = city || "";
                    address1.district = county || "";
                } else {
                }
                return address1
            },

            //上下架转换
            statusReversal: function (status) {
                switch (status) {
                    case 0:
                        return 1;
                    case 1:
                        return 0;
                }
            },


            // 判断tag输入框内是否有值
            isNone: function (tag) {
                if (tag) {
                    return false
                }
                else {
                    return true
                }
            },
            // 判断tags是否已存在tag
            isRepeat: function (tagObj, tags) {
                return tags.every(function (item) {
                    return item.tag != tagObj.tag;
                });
            },
            //判断tag里是否存在tag（数组）
            isRepeat2: function (tag, tags) {
                return tags.indexOf(tag) === -1
            },
            //判断人才报告中是否有选择基础信息和工作履历
            isChooseReport: function (data) {
                return data === 0 ? false : true;
            },
            //转换取到的数据为数组
            changeCompanyLable: function (data) {
                return data.split(',').map(Number);
            },
            //转换数组到字符串
            changeToString: function (data) {
                return typeof (data) === "string" ? data : data.join(",");
            },
            //人才报告技能树处理
            changeRport: function (item, arr) {
                var eq = true;
                if (arr.length === 0) {
                    arr.push(item);
                    return arr
                } else {
                    angular.forEach(arr, function (data) {
                        if (data.id === item.id) {
                            data = item;
                            eq = false;
                        }
                    })
                }
                ;
                if (eq) {
                    arr.push(item);
                }
                return arr
            },
            //标签点击取值
            checkboxMulti: function (item, arr) {
                if (judgementExistence()) {
                    deltags(item);
                } else {
                    if (arr.length < 5) {
                        arr.push(item)
                    }
                }
                console.log(arr);
                //判断是否存在
                function judgementExistence() {
                    return arr.some(function (ite) {
                        return (item == ite)
                    });
                }

                //存在查找索引进行删除
                function deltags() {
                    arr.splice(arr.indexOf(item), 1)
                }
            },
            //公司标签转换
            companyTags: function (tag) {
                tag = tag.map(function (item) {
                    var obj = {};
                    obj.name = item.tag;
                    obj.check = false;
                    return obj
                });
                return tag
            },
            //转换服务器上接收到的string为数字
            changeToNumber: function (data) {
                return angular.forEach(data, function (item) {
                    return angular.forEach(item, function (items, name) {
                        return item[name] = !isNaN(items) && items != "" ? +items : items;
                    })
                })
            },
            //单个的数据，转为数字
            changeTONumber2: function (data) {
                return angular.forEach(data, function (item, name) {
                    return data[name] = !isNaN(item) && item != "" ? +item : item;
                })
            },
            //人才报告，对应职位转换对应职位维度名称
            changeReportPro: function (num) {
                switch (num) {
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        return ['开发效率', '业务知识', '流程规范', '团队协作'];
                    case 1:
                        return ['搭建效率', '业务知识', '流程规范', '团队协作'];
                    case 2:
                        return ['市场调研', '产品设计', '流程规范', '团队协作'];
                    case 0:
                        return ['android', 'ios', 'h5', 'web'];
                }
            },
            //人才报告，显示转换
            changeReportPro2: function (num) {
                switch (num) {
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        return [{text: '开发效率', max: 100}, {text: '流程规范', max: 100}, {text: '业务知识', max: 100}, {text: '团队协作', max: 100}];
                    case 1:
                        return [{text: '搭建效率', max: 100},  {text: '流程规范', max: 100},{text: '业务知识', max: 100}, {text: '团队协作', max: 100}];
                    case 2:
                        return [{text: '市场调研', max: 100}, {text: '流程规范', max: 100}, {text: '产品设计', max: 100},{text: '团队协作', max: 100}];
                    case 0:
                        return [{text: 'android', max: 100}, {text: 'h5', max: 100},{text: 'ios', max: 100}, {text: 'web', max: 100}];
                }
            },
            //人才匹配，改变职位数字
            changeTlantNum : function (num) {
              switch (num) {
                  case 0:
                      return 2;
                  case 1:
                      return 7;
                  case 2:
                      return 1;
                  case 3:
                      return 8;
                  case 4:
                      return 5;
                  case 5:
                      return 4;
                  case 6:
                      return 6;
              }
            },
            //职位匹配，改变人才数字
            changePositionNum:function (num) {
                switch (num) {
                    case 2:
                        return 0;
                    case 7:
                        return 1;
                    case 1:
                        return 2;
                    case 8:
                        return 3;
                    case 5:
                        return 4;
                    case 4:
                        return 5;
                    case 6:
                        return 6;
                    case 3:
                        return "";
                }
            },
            //人才报告，用于转换职业数字与后台对应
            changeReportPron: function (num) {
                switch (num) {
                    case 0:
                        return 8;
                    case 1:
                        return 6;
                    case 2:
                        return 7;
                    case 3:
                        return 5;
                    case 4:
                        return 4;
                    case 5:
                        return 3;
                    case 6:
                        return 2;
                }
            },
            //将获取下来的数据转换成我能操作的数据
            changeDataParse: function (obj) {
                angular.forEach(obj, function (item, key) {
                    obj[key] = JSON.parse(item)
                });
                return obj
            },
            //将要传入的数据改变为服务器能接受的形式
            changeDataStringify: function (obj) {
                angular.forEach(obj, function (item, key) {
                    obj[key] = JSON.stringify(item)
                })
                return obj
            },
            //人才报告技能树比对，更改修改节点
            comparTree: function (tree, editeData) {
                angular.forEach(tree, function (oldItem,key) {
                    angular.forEach(editeData, function (newItem) {
                        if (oldItem.id === newItem.id) {
                            tree[key] = newItem;
                        }
                    })
                })
                return tree;
            },
            //比对两个值，最大值小于最小值，最大值会为空
            comparNumBig: function (bignum, smallnum) {
                if (smallnum) {
                    bignum = bignum > smallnum ? bignum : '';
                }
                return bignum
            },
            //转换时间为时间戳
            changeDate: function (date) {
                return new Date(date).getTime();
            },
            //技能树的数据处理
            //0.对比等级，删除不需要显示的
            changeSkillTree:function (obj,arr) {
              angular.forEach(obj,function (data,key) {
                  if(arr.indexOf(data.priority)===-1&&data.parentId!=0){
                     delete obj[key]
                  }
              });
              return obj
            },
            //1.转换为百度脑图需要的格式
            skillToJson: function (arr, template, theme) {
                var json = {
                    "root": {},
                    "template": template || "default",
                    "theme": theme || "fresh-blue"
                };
                var color = {
                    1: '#a6a6a6',
                    2: '#ffffff',
                    3: '#9bbb59',
                    4: '#4bacc6',
                    5: '#8064a2',
                    6: '#f79646'
                };
                var rootItem = arr.filter(function (item) {
                    return item.parentId == ''||item.parentId==="0";
                })[0];

                json.root = {
                    data: {id: rootItem.id, text: rootItem.name, note: rootItem.content},
                    children: []
                };
                mapJson(json.root);

                function mapJson(json) {
                    var pid = '';

                    if (json.data) {
                        pid = json.data.id;
                    }

                    angular.forEach(arr, function (item) {
                        if (item.parentId == pid) {
                            json.children.push({
                                data: {
                                    id: item.id,
                                    text: item.name,
                                    note: item.content,
                                    background: color[item.priority],
                                    sort: item.sort,
                                }, children: []
                            });
                        }
                    });
                    json.children = json.children.sort(function (a, b) {
                        return a.data.sort - b.data.sort;
                    });

                    if (json.children && json.children.length > 0) {
                        angular.forEach(json.children, function (item) {
                            mapJson(item);
                        })
                    }
                }

                return json;
            },
            //2.转换为书行打印到页面进行编辑
            skillToJsonList: function (arr) {

                var rootItem = arr.filter(function (item) {
                    return item.parentId == 0;
                });

                if (rootItem.length == 0) {
                    console.error('技能树没有根节点，无法渲染');
                    return false;
                }

                var root = {
                    data: {
                        id: rootItem[0].id,
                        name: rootItem[0].name,
                        content: rootItem[0].content,
                        priority: rootItem[0].priority,
                        sort: rootItem[0].sort||"",
                        value: rootItem[0].value||"",
                        parentId: rootItem[0].parentId
                    },
                    children: []
                };
                mapJson(root);

                function mapJson(json) {
                    var parentId = '';

                    if (json.data) {
                        parentId = json.data.id;
                    }

                    angular.forEach(arr, function (item) {
                        if (item.parentId == parentId) {
                            json.children.push({
                                data: {
                                    id: item.id,
                                    name: item.name,
                                    content: item.content,
                                    priority: item.priority,
                                    sort: item.sort||"",
                                    value: item.value||"",
                                    parentId: item.parentId
                                }, children: []
                            });
                        }
                    });
                    json.children = json.children.sort(function (a, b) {
                        return a.data.sort - b.data.sort;
                    });

                    if (json.children && json.children.length > 0) {
                        angular.forEach(json.children, function (item) {
                            mapJson(item);
                        })
                    }
                }

                return [root];
            },

            // 获取服务器时间戳
            getServerTime: function() {
                var p = new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    //用异步请求
                    req.open('GET', "/" ,true);
                    req.send(null);
                    //监听XMLHttpRequest 的状态
                    req.onreadystatechange = function() {
                        //请求已接收
                        if (req.readyState === 2) {
                            //得到响应头里面的字符串形式的时间
                            var time = req.getResponseHeader("Date");
                            // edge浏览器上有问题，获取不到时间。获取不到就用本地时间。
                            if(!time) {
                                time = new Date();
                            }
                            //code作为校验码，0为成功获取到时间戳
                            resolve(
                                Date.parse(new Date(time))
                            );
                        }
                    };
                });
                return p;
            },
            // 将常量表数据进行处理,使得符合指令需要的数据

            areaDataFilter:function (res) {
                var areaData ={};
                areaData.provinces = [];
                areaData.cities = [];
                areaData.provinces = res.filter(function (item) {
                    if (item.type=='province') {
                        return item;
                    }
                });
                areaData.cities = res.filter(function (item) {
                    if (item.type=='city') {
                        return item;
                    }
                });
                return areaData;
            }


        }
    })

    .factory("datePickerUtils", ["$filter", function ($filter) {
        return {
            isDate: function (obj) {
                return Object.prototype.toString.call(obj) === "[object Date]";
            },

            buildDates: function (date, options) {
                var dates = [],
                    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 3);

                options = options || {};
                date = new Date(date);

                while (date.getDay() !== options.weekStartsOn) {
                    date.setDate(date.getDate() - 1);
                }

                for (var i = 0; i < 42; i++) { // 42 == 6 rows of dates
                    if (options.noExtraRows && date.getDay() === options.weekStartsOn && date > lastDate) break;

                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return dates;
            },

            buildDayNames: function (weekStartsOn) {
                var dayNames = ['日', '一', '二', '三', '四', '五', '六'];

                if (weekStartsOn) {
                    dayNames = dayNames.slice(0);
                    for (var i = 0; i < weekStartsOn; i++) {
                        dayNames.push(dayNames.shift());
                    }
                }
                return dayNames;
            },

            monthCourse: function (start, end) {
                var months = [];
                start = new Date(start);
                end = new Date(end);
                var differ = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                for (var i = 0; i < differ; i++) {
                    var newMonth = new Date(start.getFullYear(), start.getMonth() + i, 1);
                    months.push($filter('date')(newMonth, 'yyyy-MM'));
                }
                return months;
            },

            getMonthDate: function (year, month) {
                return new Date(year, month + 1, 0).getDate();
            },

            getDateByTime: function (date, time) {
                var year = new Date(date).getFullYear();
                var month = new Date(date).getMonth();
                var day = new Date(date).getDate();
                var hours = new Date(time).getHours();
                var minutes = new Date(time).getMinutes();

                if (!date || !time) {
                    return "";
                } else {
                    return new Date(year, month, day, hours, minutes).getTime();
                }
            }
        };
    }])
;



